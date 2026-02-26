import { prisma } from "./db";

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    if (pathname === "/favicon.ico") return new Response(null, { status: 204 });

    const [
      clients,
      users,
      memberships,
      resourceTypes,
      resources,
      resourceSchedules,
      bookings,
      payments,
      notifications,
    ] = await Promise.all([
      prisma.client.findMany(),
      prisma.user.findMany(),
      prisma.membership.findMany(),
      prisma.resourceType.findMany(),
      prisma.resource.findMany(),
      prisma.resourceSchedule.findMany(),
      prisma.booking.findMany(),
      prisma.payment.findMany(),
      prisma.notification.findMany(),
    ]);

    return new Response(
      JSON.stringify({
        clients,
        users,
        memberships,
        resourceTypes,
        resources,
        resourceSchedules,
        bookings,
        payments,
        notifications,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  },
});

console.log(`Servidor en http://localhost:${server.port}`);
