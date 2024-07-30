import { NextRequest, NextResponse } from "next/server";
import { db, getUsers } from "../../../lib/db";
import { users } from "../../../lib/schema";
import { desc } from "drizzle-orm/sql";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(req: NextRequest, res: NextResponse) {
  if (req.method === "GET") {
    try {
<<<<<<< HEAD
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
=======
      // const result = await db.select().from(users);
      const result = await getUsers();

      // console.log("------------------------------", "result", result);
      return Response.json({
        data: result,
      });
    } catch (error) {
      console.log(error, "error --------------------- error");
>>>>>>> a3fb61e6db61aa2f64609a3d7f582ee1537122f9
      return NextResponse.json(
        { error: "Internal server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" });
  }
}
