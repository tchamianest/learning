import { db } from "@/src/lib/db";
import { users } from "@/src/lib/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  if (req.method === "PUT") {
    const { id, name } = await req.json();
    try {
      const response = await db
        .update(users)
        .set({ name: name })
        .where(eq(users.id, id));
      return Response.json({ status: 201, response });
      // res.status(201).json(newuser);
    } catch (error) {
      return Response.json({ error: error });
    }
  } else {
    return Response.json({ error: "Method not allowed" });
  }
}
