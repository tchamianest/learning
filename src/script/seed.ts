import { NewUser, insertUser } from "@/src/lib/db";

async function main() {
  const newUser: NewUser = {
    name: "Iradukunda Ernest",
  };
  const res = await insertUser(newUser);

  process.exit();
}

main();