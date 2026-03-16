import { Hono } from "hono";
import { prisma } from "../db";

export const blocks = new Hono();

// ==========================================
// GET / (Se asume que se monta en /resources/blocks)
// Obtiene todos los bloqueos de la base de datos
// ==========================================
blocks.get("/", async (c) => {
  try {
    const resourceBlocks = await prisma.resourceBlock.findMany({
      include: {
        resource: {
          select: {
            name: true, // Para mostrar el nombre de la cancha en el frontend
          },
        },
      },
      orderBy: {
        date: "desc", // Mostrar los más recientes primero
      },
    });

    return c.json(resourceBlocks);
  } catch (error) {
    console.error("Error al obtener ResourceBlocks:", error);
    return c.json(
      { error: "Error al obtener los registros de la base de datos" },
      500,
    );
  }
});

// ==========================================
// POST /
// Crea un nuevo bloqueo de mantenimiento
// ==========================================
blocks.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { resourceId, date, startTime, endTime, reason } = body;

    // Validación básica
    if (!resourceId || !date || !startTime || !endTime) {
      return c.json({ error: "Faltan campos obligatorios" }, 400);
    }

    const newBlock = await prisma.resourceBlock.create({
      data: {
        resourceId,
        date: new Date(date), // Convertir el string del frontend a DateTime
        startTime,
        endTime,
        reason: reason || "Mantenimiento general",
      },
    });

    return c.json(newBlock, 201);
  } catch (error) {
    console.error("Error al crear ResourceBlock:", error);
    return c.json(
      { error: "No se pudo crear el registro de mantenimiento" },
      500,
    );
  }
});

// ==========================================
// DELETE /:id
// Elimina un bloqueo por su CUID
// ==========================================
blocks.delete("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    await prisma.resourceBlock.delete({
      where: { id },
    });

    return c.json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar ResourceBlock:", error);
    return c.json(
      { error: "El registro no existe o no pudo ser eliminado" },
      404,
    );
  }
});
