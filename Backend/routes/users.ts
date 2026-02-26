import { Hono } from "hono";
import { prisma } from "../db";

export const users = new Hono();

users.get("/", async (c) => {
  const all = await prisma.user.findMany();
  return c.json(all);
});

users.get("/:id", async (c) => {
  const id = c.req.param("id");
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return c.json({ error: "User not found" }, 404);
  return c.json(user);
});

users.post("/", async (c) => {
  const body = await c.req.json();
  const user = await prisma.user.create({ data: body });
  return c.json(user, 201);
});

users.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const user = await prisma.user.update({ where: { id }, data: body });
  return c.json(user);
});

users.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await prisma.user.delete({ where: { id } });
  return c.json({ message: "Deleted" });
});
