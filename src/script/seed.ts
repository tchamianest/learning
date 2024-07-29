import { NewUser, insertUser } from '@/src/lib/db';

async function main() {
  const newUser: NewUser = {
    name: 'Iradukunda Ernest',
  };
  await insertUser(newUser);

  process.exit();
}

main();
