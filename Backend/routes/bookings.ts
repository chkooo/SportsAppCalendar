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
  const body = await c.req.json();
  const booking = await prisma.booking.create({ data: body });
  return c.json(booking, 201);
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
