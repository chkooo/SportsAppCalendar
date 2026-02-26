import { Hono } from "hono";
import { prisma } from "../db";

export const clients = new Hono();

clients.get("/", async (c) => {
  const all = await prisma.client.findMany();
  return c.json(all);
});

clients.get("/:id", async (c) => {
  const id = c.req.param("id");
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) return c.json({ error: "Client not found" }, 404);
  return c.json(client);
});

clients.post("/", async (c) => {
  const body = await c.req.json();
  const client = await prisma.client.create({ data: body });
  return c.json(client, 201);
});

clients.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const client = await prisma.client.update({ where: { id }, data: body });
  return c.json(client);
});

clients.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await prisma.client.delete({ where: { id } });
  return c.json({ message: "Deleted" });
});
