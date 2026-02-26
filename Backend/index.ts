import { Hono } from "hono";
import { cors } from "hono/cors";
import { clients } from "./routes/clients.ts";
import { users } from "./routes/users.ts";
import { resources } from "./routes/resources.ts";
import { bookings } from "./routes/bookings.ts";
import { payments } from "./routes/payments.ts";

const app = new Hono();

// Middleware
app.use("*", cors());

// Routes
app.route("/clients", clients);
app.route("/users", users);
app.route("/resources", resources);
app.route("/bookings", bookings);
app.route("/payments", payments);

// Health check
app.get("/", (c) => c.json({ status: "ok", message: "API running 🚀" }));

Bun.serve({
  port: 3000,
  fetch: app.fetch,
});

console.log("Server running on http://localhost:3000");
