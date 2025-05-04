import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.note.upsert({
    where: { title: 'My first note on prisma' },
    update: {},
    create: {
      title: 'My first note on prisma',
      body: 'This is the first note I saved on my postgreSQL using Prisma with NestJs',
      description: 'This is the first note',
      published: false,
    },
  });

  const post2 = await prisma.note.upsert({
    where: { title: 'My second note on prisma' },
    update: {},
    create: {
      title: 'My second note on prisma',
      body: 'RADA RADA RADA WADA WADA WADA',
      description:
        'Sabe que esse dia ta sendo realmente bem legal?\n to feliz que isso ta funcionando tão facil 🤓',
      published: true,
    },
  });

  console.log({ post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
