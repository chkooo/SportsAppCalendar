import { Hono } from "hono";
import { prisma } from "../db";

export const bookings = new Hono();

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

    // Validar que todos los campos requeridos estén presentes
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

    // Verificar que no haya conflicto de horarios
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
      // Verificar si hay superposición de horarios
      const newStart = parseInt(body.startTime.replace(":", ""));
      const newEnd = parseInt(body.endTime.replace(":", ""));
      const existStart = parseInt(
        conflictingBooking.startTime.replace(":", ""),
      );
      const existEnd = parseInt(conflictingBooking.endTime.replace(":", ""));

      if (!(newEnd <= existStart || newStart >= existEnd)) {
        return c.json(
          {
            error: "Ya existe una reserva en ese horario para este recurso",
          },
          409,
        );
      }
    }

    // Convertir tipos correctamente
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
