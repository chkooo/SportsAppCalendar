import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // ============================================
  // CLIENT
  // ============================================
  const client = await prisma.client.create({
    data: {
      name: "Sports Club Juárez",
      slug: "sports-club-juarez",
      email: "admin@sportsclub.com",
      phone: "6561234567",
      paymentMode: "BOTH",
      currency: "MXN",
    },
  });

  // ============================================
  // USERS
  // ============================================
  const admin = await prisma.user.create({
    data: {
      id: "superadmin-uuid-0001", // in real life this comes from Supabase Auth
      name: "Admin Juárez",
      email: "admin@sportsclub.com",
      phone: "6561110000",
    },
  });

  const customers = await Promise.all([
    prisma.user.create({
      data: {
        id: "user-uuid-0001",
        name: "Juan Pérez",
        email: "juan@email.com",
        phone: "6561234567",
      },
    }),
    prisma.user.create({
      data: {
        id: "user-uuid-0002",
        name: "María López",
        email: "maria@email.com",
        phone: "6569876543",
      },
    }),
    prisma.user.create({
      data: {
        id: "user-uuid-0003",
        name: "Carlos Ruiz",
        email: "carlos@email.com",
        phone: "6561112233",
      },
    }),
  ]);

  // ============================================
  // MEMBERSHIPS
  // ============================================
  await prisma.membership.create({
    data: { userId: admin.id, clientId: client.id, role: "ADMIN" },
  });

  await Promise.all(
    customers.map((u) =>
      prisma.membership.create({
        data: { userId: u.id, clientId: client.id, role: "CUSTOMER" },
      }),
    ),
  );

  // ============================================
  // RESOURCE TYPES
  // ============================================
  const footballType = await prisma.resourceType.create({
    data: {
      clientId: client.id,
      name: "Fútbol",
      description: "Canchas de fútbol",
      icon: "football",
    },
  });

  const tennisType = await prisma.resourceType.create({
    data: {
      clientId: client.id,
      name: "Tenis",
      description: "Canchas de tenis",
      icon: "tennis",
    },
  });

  // ============================================
  // RESOURCES
  // ============================================
  const field1 = await prisma.resource.create({
    data: {
      clientId: client.id,
      resourceTypeId: footballType.id,
      name: "Cancha de Fútbol 1",
      description: "Cancha profesional con césped sintético",
      pricePerHour: 250.0,
    },
  });

  const field2 = await prisma.resource.create({
    data: {
      clientId: client.id,
      resourceTypeId: footballType.id,
      name: "Cancha de Fútbol 2",
      description: "Cancha estándar al aire libre",
      pricePerHour: 200.0,
    },
  });

  const tennisField = await prisma.resource.create({
    data: {
      clientId: client.id,
      resourceTypeId: tennisType.id,
      name: "Cancha de Tenis 1",
      description: "Cancha de tenis con superficie dura",
      pricePerHour: 150.0,
    },
  });

  // ============================================
  // RESOURCE SCHEDULES (Mon-Sun for each resource)
  // ============================================
  const resources = [field1, field2, tennisField];

  await Promise.all(
    resources.flatMap((r) =>
      [1, 2, 3, 4, 5, 6, 7].map((day) =>
        prisma.resourceSchedule.create({
          data: {
            resourceId: r.id,
            dayOfWeek: day,
            openTime: "08:00",
            closeTime: "22:00",
          },
        }),
      ),
    ),
  );

  // ============================================
  // BOOKINGS
  // ============================================
  const booking1 = await prisma.booking.create({
    data: {
      clientId: client.id,
      userId: customers[0].id,
      resourceId: field1.id,
      date: new Date("2025-03-01"),
      startTime: "10:00",
      endTime: "11:00",
      totalPrice: 250.0,
      status: "CONFIRMED",
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      clientId: client.id,
      userId: customers[1].id,
      resourceId: tennisField.id,
      date: new Date("2025-03-01"),
      startTime: "14:00",
      endTime: "16:00",
      totalPrice: 300.0,
      status: "CONFIRMED",
    },
  });

  const booking3 = await prisma.booking.create({
    data: {
      clientId: client.id,
      userId: customers[2].id,
      resourceId: field2.id,
      date: new Date("2025-03-02"),
      startTime: "18:00",
      endTime: "19:00",
      totalPrice: 200.0,
      status: "PENDING",
    },
  });

  // ============================================
  // PAYMENTS
  // ============================================
  await prisma.payment.create({
    data: {
      bookingId: booking1.id,
      userId: customers[0].id,
      amount: 250.0,
      method: "CARD",
      status: "PAID",
      paidAt: new Date(),
    },
  });

  await prisma.payment.create({
    data: {
      bookingId: booking2.id,
      userId: customers[1].id,
      amount: 300.0,
      method: "CASH",
      status: "PAID",
      paidAt: new Date(),
    },
  });

  await prisma.payment.create({
    data: {
      bookingId: booking3.id,
      userId: customers[2].id,
      amount: 200.0,
      method: "TRANSFER",
      status: "PENDING",
    },
  });

  console.log("✅ Seed data inserted!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
