import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { usersdata } from "@/lib/schema";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    console.log({ email, password });

    const hashedPassword = await hash(password, 10);

    const user = await db
      .insert(usersdata)
      .values({ email, password: hashedPassword, createdAt: new Date() })
      .returning();
    return NextResponse.json({ status: 201, user });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
