import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { users } from "../../../lib/schema";
import { desc } from "drizzle-orm/sql";

export async function GET(req: NextRequest, res: NextResponse) {
  if (req.method === "GET") {
    try {
      const result = await db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt));
      return NextResponse.json({
        data: result,
      });
    } catch (error) {
      return Response.json({ error });
    }
  } else {
    return Response.json({ error: "Method not allowed" });
  }
}
