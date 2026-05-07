import { Hono } from "hono";
import { prisma } from "../db";
import { createClient } from "@supabase/supabase-js";

export const users = new Hono();

const supabaseUrl = process.env.SUPABASE_URL || "https://your-project.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || "";

let supabase: any = null;
if (supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

users.get("/", async (c) => {
  const { q, role, status, clientId, page = "1", limit = "20" } = c.req.query();
  
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 20;
  const skip = (pageNum - 1) * limitNum;

  const where: any = {};
  
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
    ];
  }

  if (status) {
    where.active = status === "active";
  }

  // Filter by client and optionally by role within that client
  if (clientId) {
    where.memberships = {
      some: { 
        clientId,
        ...(role && { role: role as any }),
      },
    };
  } else if (role) {
    where.memberships = {
      some: { role: role as any },
    };
  }

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: { memberships: true },
      skip,
      take: limitNum,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ]);

  return c.json({
    data,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
  });
});

users.get("/:id", async (c) => {
  const id = c.req.param("id");
  const user = await prisma.user.findUnique({ 
    where: { id },
    include: { memberships: true },
  });
  if (!user) return c.json({ error: "User not found" }, 404);
  return c.json(user);
});

users.post("/", async (c) => {
  const body = await c.req.json();
  const { name, email, phone, role, password, clientId } = body;

  if (!name || !email) {
    return c.json({ error: "Name and email are required", status: 400 }, 400);
  }

  if (!clientId) {
    return c.json({ error: "clientId is required to create user with role", status: 400 }, 400);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return c.json({ error: "Email already registered", status: 409 }, 409);
  }

  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) {
    return c.json({ error: "Client not found", status: 404 }, 404);
  }

  const tempPassword = password || "TempPass123!";
  
  let authUser;
  let userId: string;

  if (supabase) {
    try {
      authUser = await supabase.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
      });
      if (authUser.error) {
        console.error("Supabase auth error:", authUser.error);
        return c.json({ error: authUser.error.message, status: 400 }, 400);
      }
      userId = authUser.data?.user?.id;
    } catch (authError: any) {
      console.error("Auth creation failed:", authError);
      return c.json({ error: "Failed to create auth user", status: 500 }, 500);
    }

    if (!userId) {
      return c.json({ error: "Failed to get user ID from auth", status: 500 }, 500);
    }
  } else {
    userId = crypto.randomUUID();
  }

  const user = await prisma.user.create({
    data: {
      id: userId,
      name,
      email,
      phone: phone || null,
      active: true,
    },
  });

  if (role && role !== "CUSTOMER") {
    await prisma.membership.create({
      data: {
        userId: user.id,
        clientId: body.clientId,
        role: role as any,
        active: true,
      },
    });
  }

  return c.json(user, 201);
});

users.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) {
    return c.json({ error: "User not found", status: 404 }, 404);
  }

  if (body.email && body.email !== existing.email) {
    const emailTaken = await prisma.user.findUnique({ where: { email: body.email } });
    if (emailTaken) {
      return c.json({ error: "Email already in use", status: 409 }, 409);
    }
  }

  const user = await prisma.user.update({
    where: { id },
    data: {
      name: body.name,
      phone: body.phone,
      avatarUrl: body.avatarUrl,
    },
  });
  return c.json(user);
});

users.delete("/:id", async (c) => {
  const id = c.req.param("id");
  
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) {
    return c.json({ error: "User not found", status: 404 }, 404);
  }

  await prisma.user.update({
    where: { id },
    data: { active: false },
  });
  
  return c.json({ message: "User soft-deleted (deactivated)" });
});

users.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        phone: body.phone,
        active: body.active,
        avatarUrl: body.avatarUrl,
      },
    });
    return c.json(user);
  } catch (e) {
    return c.json({ error: "Error updating user" }, 500);
  }
});

users.patch("/:id/role", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { role, clientId } = body;

  if (!role || !clientId) {
    return c.json({ error: "Role and clientId are required", status: 400 }, 400);
  }

  const validRoles = ["SUPERADMIN", "ADMIN", "STAFF", "CUSTOMER"];
  if (!validRoles.includes(role)) {
    return c.json({ error: "Invalid role. Must be one of: " + validRoles.join(", "), status: 400 }, 400);
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return c.json({ error: "User not found", status: 404 }, 404);
  }

  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) {
    return c.json({ error: "Client not found", status: 404 }, 404);
  }

  const membership = await prisma.membership.findFirst({
    where: { userId: id, clientId },
  });

  if (membership) {
    await prisma.membership.update({
      where: { id: membership.id },
      data: { role: role as any },
    });
  } else {
    await prisma.membership.create({
      data: {
        userId: id,
        clientId,
        role: role as any,
        active: true,
      },
    });
  }

  return c.json({ message: "Role updated successfully" });
});

users.post("/sync", async (c) => {
  const body = await c.req.json();
  let { userId, name, email, phone, clientId } = body;

  if (!userId || !email) {
    return c.json({ error: "userId and email are required", status: 400 }, 400);
  }

  // Skip empty clientId
  if (!clientId || clientId === "undefined") {
    clientId = null;
  }

  const existingUser = await prisma.user.findUnique({ where: { id: userId } });
  
  if (existingUser) {
    if (name || phone) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          name: name || undefined,
          phone: phone || undefined,
        },
      });
    }
    return c.json(existingUser);
  }

  // Check if client exists if clientId provided
  if (clientId) {
    const client = await prisma.client.findUnique({ where: { id: clientId } });
    if (!client) {
      console.warn(`Client ${clientId} not found, creating user without membership`);
      clientId = null;
    }
  }

  const user = await prisma.user.create({
    data: {
      id: userId,
      name: name || "User",
      email,
      phone: phone || null,
      active: true,
    },
  });

  if (clientId) {
    await prisma.membership.create({
      data: {
        userId: user.id,
        clientId,
        role: "CUSTOMER",
        active: true,
      },
    });
  }

  return c.json(user, 201);
});
