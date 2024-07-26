import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { users } from "../../../lib/schema";
import { desc } from "drizzle-orm/sql";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(req: NextRequest, res: NextResponse) {
  if (req.method === "GET") {
    try {
      const result = await db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt));
      const path = req.nextUrl.pathname;
      revalidatePath(path);
      return NextResponse.json(
        {
          data: result,
        },
        { headers: { "Cache-Control": "no-store" } }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" });
  }
}
