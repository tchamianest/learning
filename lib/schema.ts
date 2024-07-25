import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const usersdata = pgTable(
  "usersdata",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (usersdata) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(usersdata.email),
    };
  }
);
