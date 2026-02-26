import { Hono } from "hono";
import { prisma } from "../db";

export const payments = new Hono();

payments.get("/", async (c) => {
  const all = await prisma.payment.findMany({
    include: { booking: true, user: true },
  });
  return c.json(all);
});

payments.get("/:id", async (c) => {
  const id = c.req.param("id");
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { booking: true, user: true },
  });
  if (!payment) return c.json({ error: "Payment not found" }, 404);
  return c.json(payment);
});

payments.post("/", async (c) => {
  const body = await c.req.json();
  const payment = await prisma.payment.create({ data: body });
  return c.json(payment, 201);
});

payments.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const payment = await prisma.payment.update({ where: { id }, data: body });
  return c.json(payment);
});

payments.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await prisma.payment.delete({ where: { id } });
  return c.json({ message: "Deleted" });
});
