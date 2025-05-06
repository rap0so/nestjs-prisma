import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // create an dummy author
  const user1 = await prisma.user.upsert({
    where: { login: 'dummy' },
    update: {},
    create: {
      login: 'dummy',
      name: 'Dummy',
      password: '123456',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { login: 'dummier' },
    update: {},
    create: {
      login: 'dummier',
      name: 'Dummier',
      password: '123456',
    },
  });

  // create two dummy articles
  const post1 = await prisma.note.upsert({
    where: { title: 'My first note on prisma' },
    update: { authorId: user1.id },
    create: {
      title: 'My first note on prisma',
      body: 'This is the first note I saved on my postgreSQL using Prisma with NestJs',
      description: 'This is the first note',
      published: false,
      authorId: 1,
    },
  });

  const post2 = await prisma.note.upsert({
    where: { title: 'My second note on prisma' },
    update: { authorId: user2.id },
    create: {
      title: 'My second note on prisma',
      body: 'RADA RADA RADA WADA WADA WADA',
      description:
        'Sabe que esse dia ta sendo realmente bem legal?\n to feliz que isso ta funcionando tão facil 🤓',
      published: true,
      authorId: 1,
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
