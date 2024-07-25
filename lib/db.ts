import "@/lib/config";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
// import { sql } from "@vercel/postgres";
import { createClient } from "@vercel/postgres";
import { users } from "./schema";
import * as schema from "./schema";

const sql = neon(process.env.POSTGRES_URL as string);
// neonConfig.fetchConnectionCache = false;

// console.log(process.env.POSTGRES_URL as string);

export const db = drizzle(sql, { schema });

export const getUsers = async () => {
  const selectResult = await db.select().from(users);
  return selectResult;
};

export type NewUser = typeof users.$inferInsert;

export const insertUser = async (user: NewUser) => {
  return db.insert(users).values(user).returning();
};

export const getUsers2 = async () => {
  const result = await db.query.users.findMany();
  return result;
};
