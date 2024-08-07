import { db, insertUser } from "@/lib/db";
import { users } from "@/lib/schema";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    const { name } = await req.json();
    try {
      // const newuser = await db
      //   .insert(users)
      //   .values({ name, createdAt: new Date() })
      //   .returning();

      const newuser = await insertUser({ name });
      return Response.json({ status: 201, newuser });
      // res.status(201).json(newuser);
    } catch (error) {
      return Response.json({ error: error });
    }
  } else {
    return Response.json({ message: "request not founds" });
  }
}
