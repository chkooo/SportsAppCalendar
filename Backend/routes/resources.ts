import { Hono } from "hono";
import { prisma } from "../db";

export const resources = new Hono();

resources.get("/", async (c) => {
  const all = await prisma.resource.findMany({
    include: { resourceType: true, schedules: true },
  });
  return c.json(all);
});

resources.get("/:id", async (c) => {
  const id = c.req.param("id");
  const resource = await prisma.resource.findUnique({
    where: { id },
    include: { resourceType: true, schedules: true },
  });
  if (!resource) return c.json({ error: "Resource not found" }, 404);
  return c.json(resource);
});

resources.post("/", async (c) => {
  const body = await c.req.json();
  const resource = await prisma.resource.create({ data: body });
  return c.json(resource, 201);
});

resources.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const resource = await prisma.resource.update({ where: { id }, data: body });
  return c.json(resource);
});

resources.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await prisma.resource.delete({ where: { id } });
  return c.json({ message: "Deleted" });
});
