import { NextRequest, NextResponse } from "next/server";
import { db, getUsers } from "../../../lib/db";
import { users } from "../../../lib/schema";
import { desc } from "drizzle-orm/sql";

export async function GET(req: NextRequest, res: NextResponse) {
  if (req.method === "GET") {
    try {
      // const result = await db.select().from(users);
      const result = await getUsers();

      // console.log("------------------------------", "result", result);
      return Response.json({
        data: result,
      });
    } catch (error) {
      console.log(error, "error --------------------- error");
      return NextResponse.json(
        { error: "Internal server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" });
  }
}
