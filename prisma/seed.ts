import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  const password = await hash('Password123', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { login: 'dummy@dummy.com' },
    update: { password },
    create: {
      login: 'dummy@dummy.com',
      name: 'Dummy',
      password,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { login: 'dummier@dummier.com' },
    update: { password },
    create: {
      login: 'dummier@dummier.com',
      name: 'Dummier',
      password,
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

  console.log({ user1, user2, post1, post2 });
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
