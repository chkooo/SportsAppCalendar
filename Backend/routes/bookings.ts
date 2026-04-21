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

    if (user?.email) {
      await transporter.sendMail({
        from: `"SportApp Calendar" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: "✅ Confirmación de Reserva - SportApp",
        html: `
              <div style="font-family: sans-serif; max-width: 520px; margin: auto; padding: 32px; background: #ffffff;">
                
                <!-- HEADER -->
                <div style="background: #18181b; border-radius: 12px 12px 0 0; padding: 24px; text-align: center;">
                  <h1 style="color: #3b82f6; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase;">
                    SPORT<span style="color: #ffffff;">APP</span>
                  </h1>
                  <p style="color: #71717a; margin: 4px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Calendar</p>
                </div>

                <!-- BODY -->
                <div style="border: 1px solid #e4e4e7; border-top: none; border-radius: 0 0 12px 12px; padding: 28px;">
                  <h2 style="color: #18181b; font-size: 20px; margin: 0 0 8px;">¡Reserva Confirmada! ✅</h2>
                  <p style="color: #71717a; margin: 0 0 24px;">Hola <strong style="color: #18181b;">${user.name}</strong>, tu reserva ha sido registrada exitosamente.</p>

                  <!-- DETALLES -->
                  <div style="background: #f4f4f5; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr style="border-bottom: 1px solid #e4e4e7;">
                        <td style="padding: 10px 0; color: #71717a; font-size: 13px;">Cancha</td>
                        <td style="padding: 10px 0; font-weight: bold; color: #18181b; font-size: 13px; text-align: right;">${resource?.name || "N/A"}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #e4e4e7;">
                        <td style="padding: 10px 0; color: #71717a; font-size: 13px;">Fecha</td>
                        <td style="padding: 10px 0; color: #18181b; font-size: 13px; text-align: right;">${body.date}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #e4e4e7;">
                        <td style="padding: 10px 0; color: #71717a; font-size: 13px;">Horario</td>
                        <td style="padding: 10px 0; color: #18181b; font-size: 13px; text-align: right;">${body.startTime} - ${body.endTime}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #e4e4e7;">
                        <td style="padding: 10px 0; color: #71717a; font-size: 13px;">Total</td>
                        <td style="padding: 10px 0; font-weight: bold; color: #3b82f6; font-size: 13px; text-align: right;">$${body.totalPrice} MXN</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #71717a; font-size: 13px;">Estado</td>
                        <td style="padding: 10px 0; font-weight: bold; color: #22c55e; font-size: 13px; text-align: right;">${bookingData.status}</td>
                      </tr>
                    </table>
                  </div>

                  <p style="color: #71717a; font-size: 14px; margin: 0 0 24px;">¡Nos vemos en la cancha! 💪</p>

                  <!-- FOOTER -->
                  <div style="border-top: 1px solid #e4e4e7; padding-top: 16px; text-align: center;">
                    <p style="color: #a1a1aa; font-size: 11px; margin: 0;">SportApp Calendar — Sistema de Reservas Deportivas</p>
                    <p style="color: #d4d4d8; font-size: 11px; margin: 4px 0 0;">Este correo fue enviado automáticamente, por favor no respondas.</p>
                  </div>
                </div>

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
