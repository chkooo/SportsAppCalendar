import { Hono } from "hono";
import { prisma } from "../db";

export const resourceTypes = new Hono();

resourceTypes.get("/", async (c) => {
  const all = await prisma.resourceType.findMany({
    orderBy: { name: "asc" },
  });
  return c.json(all);
});