const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { user: User } = prisma;
const { project: Projects } = prisma;
const { contribution: Contribution } = prisma;
const { status: Status } = prisma;
const { priority: Priority } = prisma;
const { type: Type } = prisma;
const { ticket: Ticket } = prisma;

async function main() {
  await prisma.ticket.create({
    data: {
      title: "je suis un deuxieme ticket",
      description: "une autre description",
      estimateTime: 5,
      userId: 13,
      projectId: 39,
      statusId: 3,
      priorityId: 2,
      typeId: 3,
    },
  });
}

main()
  .catch((error) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
