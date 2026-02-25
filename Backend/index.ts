import { prisma } from "./db";

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    if (pathname === "/favicon.ico") return new Response(null, { status: 204 });

    const users = await prisma.user.findMany();
    const count = await prisma.user.count();

    return new Response(JSON.stringify({ users, totalUsers: count }), {
      headers: { "Content-Type": "application/json" },
    });
  },
});

console.log(`Servidor en http://localhost:${server.port}`);
