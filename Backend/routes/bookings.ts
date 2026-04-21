import { Hono } from "hono";
import { prisma } from "../db";
import nodemailer from "nodemailer";

export const bookings = new Hono();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

bookings.get("/", async (c) => {
  const all = await prisma.booking.findMany({
    include: { user: true, resource: true, payment: true },
  });
  return c.json(all);
});

bookings.get("/:id", async (c) => {
  const id = c.req.param("id");
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { user: true, resource: true, payment: true },
  });
  if (!booking) return c.json({ error: "Booking not found" }, 404);
  return c.json(booking);
});

bookings.post("/", async (c) => {
  try {
    const body = await c.req.json();

    const requiredFields = [
      "clientId",
      "userId",
      "resourceId",
      "date",
      "startTime",
      "endTime",
      "totalPrice",
    ];
    const missingFields = requiredFields.filter((field) => !(field in body));

    if (missingFields.length > 0) {
      return c.json(
        { error: `Faltan campos requeridos: ${missingFields.join(", ")}` },
        400,
      );
    }

    const bookingDate = new Date(body.date);
    const bookingDate_db = bookingDate.toISOString().split("T")[0];

    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        resourceId: body.resourceId,
        date: {
          gte: new Date(`${bookingDate_db}T00:00:00Z`),
          lt: new Date(`${bookingDate_db}T23:59:59Z`),
        },
        status: { in: ["CONFIRMED", "PENDING"] },
      },
    });

    if (conflictingBooking) {
      const newStart = parseInt(body.startTime.replace(":", ""));
      const newEnd = parseInt(body.endTime.replace(":", ""));
      const existStart = parseInt(
        conflictingBooking.startTime.replace(":", ""),
      );
      const existEnd = parseInt(conflictingBooking.endTime.replace(":", ""));

      if (!(newEnd <= existStart || newStart >= existEnd)) {
        return c.json(
          { error: "Ya existe una reserva en ese horario para este recurso" },
          409,
        );
      }
    }

    const bookingData = {
      clientId: body.clientId,
      userId: body.userId,
      resourceId: body.resourceId,
      date: bookingDate,
      startTime: body.startTime,
      endTime: body.endTime,
      totalPrice: parseFloat(body.totalPrice),
      status: body.status || "PENDING",
      notes: body.notes || null,
    };

    const booking = await prisma.booking.create({ data: bookingData });

    // Buscar usuario y recurso para el correo
    const user = await prisma.user.findUnique({ where: { id: body.userId } });
    const resource = await prisma.resource.findUnique({
      where: { id: body.resourceId },
    });

    // Mandar correo de confirmación
    if (user?.email) {
      await transporter.sendMail({
        from: `"SportApp Calendar" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: "✅ Confirmación de Reserva - SportApp",
        html: `
          <div style="font-family: sans-serif; max-width: 520px; margin: auto; background: #18181b; color: #fff; border-radius: 12px; padding: 32px;">
            <h2 style="color: #3b82f6; margin-bottom: 8px;">¡Reserva Confirmada! 🎾</h2>
            <p style="color: #a1a1aa;">Hola <strong style="color: #fff;">${user.name}</strong>, tu reserva ha sido registrada exitosamente.</p>
            
            <div style="background: #27272a; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <table style="width: 100%; border-collapse: collapse; color: #d4d4d8;">
                <tr style="border-bottom: 1px solid #3f3f46;">
                  <td style="padding: 8px 0; color: #71717a;">Cancha</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #fff;">${resource?.name || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #3f3f46;">
                  <td style="padding: 8px 0; color: #71717a;">Fecha</td>
                  <td style="padding: 8px 0;">${body.date}</td>
                </tr>
                <tr style="border-bottom: 1px solid #3f3f46;">
                  <td style="padding: 8px 0; color: #71717a;">Horario</td>
                  <td style="padding: 8px 0;">${body.startTime} - ${body.endTime}</td>
                </tr>
                <tr style="border-bottom: 1px solid #3f3f46;">
                  <td style="padding: 8px 0; color: #71717a;">Total</td>
                  <td style="padding: 8px 0; color: #3b82f6; font-weight: bold;">$${body.totalPrice} MXN</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717a;">Estado</td>
                  <td style="padding: 8px 0; color: #22c55e; font-weight: bold;">${bookingData.status}</td>
                </tr>
              </table>
            </div>

            <p style="color: #a1a1aa; font-size: 14px;">¡Nos vemos en la cancha! 💪</p>
            <p style="color: #52525b; font-size: 12px; margin-top: 24px;">SportApp Calendar — Sistema de Reservas Deportivas</p>
          </div>
        `,
      });
    }

    return c.json(booking, 201);
  } catch (error) {
    console.error("Error al crear booking:", error);
    return c.json(
      {
        error: "Error al crear la reserva",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      500,
    );
  }
});

bookings.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const booking = await prisma.booking.update({ where: { id }, data: body });
  return c.json(booking);
});

bookings.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await prisma.booking.delete({ where: { id } });
  return c.json({ message: "Deleted" });
});
