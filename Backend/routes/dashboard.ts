import { Hono } from "hono";
import { prisma } from "../db";

export const dashboard = new Hono();

function getMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  return { start, end };
}

dashboard.get("/metrics", async (c) => {
  try {
    const startDate = c.req.query("startDate");
    const endDate = c.req.query("endDate");

    let start: Date;
    let end: Date;

    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
    } else {
      const range = getMonthRange();
      start = range.start;
      end = range.end;
    }

    const [revenueResult, bookingsCount, revenueByDate, bookingsByDate] =
      await Promise.all([
        prisma.payment.aggregate({
          where: {
            status: "PAID",
            paidAt: { gte: start, lte: end },
          },
          _sum: { amount: true },
        }),
        prisma.booking.count({
          where: {
            date: { gte: start, lte: end },
            status: { in: ["CONFIRMED", "COMPLETED"] },
          },
        }),
        prisma.payment.groupBy({
          by: ["paidAt"],
          where: {
            status: "PAID",
            paidAt: { gte: start, lte: end },
          },
          _sum: { amount: true },
          orderBy: { paidAt: "asc" },
        }),
        prisma.booking.groupBy({
          by: ["date"],
          where: {
            date: { gte: start, lte: end },
            status: { in: ["CONFIRMED", "COMPLETED"] },
          },
          _count: { id: true },
          orderBy: { date: "asc" },
        }),
      ]);

    const uniquePaidUsers = await prisma.payment.groupBy({
      by: ["userId"],
      where: {
        status: "PAID",
        paidAt: { gte: start, lte: end },
      },
    });

    const revenueByDay = revenueByDate
      .filter((r) => r.paidAt)
      .map((r) => ({
        date: (r.paidAt as Date).toISOString().split("T")[0],
        amount: Number(r._sum?.amount || 0),
      }));

    const bookingsByDay = bookingsByDate.map((b) => ({
      date: (b.date as Date).toISOString().split("T")[0],
      count: b._count.id,
    }));

    return c.json({
      revenue: Number(revenueResult._sum?.amount || 0),
      bookings: bookingsCount,
      activeUsers: uniquePaidUsers.length,
      revenueByDay,
      bookingsByDay,
      dateRange: { start: start.toISOString(), end: end.toISOString() },
    });
  } catch (error) {
    console.error("Dashboard metrics error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

dashboard.get("/summary", async (c) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    const [
      totalUsers,
      totalResources,
      totalBookings,
      totalRevenue,
      todayBookings,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.resource.count({ where: { active: true } }),
      prisma.booking.count(),
      prisma.payment.aggregate({
        where: { status: "PAID" },
        _sum: { amount: true },
      }),
      prisma.booking.count({
        where: {
          date: { gte: todayStart, lte: todayEnd },
          status: { in: ["CONFIRMED", "COMPLETED"] },
        },
      }),
    ]);

    return c.json({
      users: totalUsers,
      resources: totalResources,
      bookings: totalBookings,
      revenue: Number(totalRevenue._sum?.amount || 0),
      todayBookings,
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    return c.json({ error: String(error) }, 500);
  }
});