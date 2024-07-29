import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { usersdata } from "@/src/lib/schema";
import { db } from "@/src/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const hashedPassword = await hash(password, 10);

    const user = await db
      .insert(usersdata)
      .values({ email, password: hashedPassword, createdAt: new Date() })
      .returning();
    return NextResponse.json({ status: 201, user });
  } catch (e) {}

  return NextResponse.json({ message: "success" });
}
