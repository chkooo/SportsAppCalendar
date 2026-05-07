import { Hono } from "hono";
import { cors } from "hono/cors";
import { clients } from "./routes/clients.ts";
import { users } from "./routes/users.ts";
import { resources } from "./routes/resources.ts";
import { bookings } from "./routes/bookings.ts";
import { payments } from "./routes/payments.ts";
import { blocks } from "./routes/blocks.ts";
import { dashboard } from "./routes/dashboard.ts";
import { resourceTypes } from "./routes/resource-types.ts";

const app = new Hono();

// Middleware
app.use("*", cors());

// Routes
app.route("/clients", clients);
app.route("/users", users);
app.route("/resources", resources);
app.route("/resource-types", resourceTypes);
app.route("/bookings", bookings);
app.route("/payments", payments);
app.route("/blocks", blocks);
app.route("/dashboard", dashboard);

app.get("/", (c) => c.json({ status: "ok", message: "API running 🚀" }));
Bun.serve({
  port: 3000,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});

console.log("Server running on http://localhost:3000");
