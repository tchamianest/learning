import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "@/lib/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: NextResponse) {
  if (req.method === "DELETE") {
    // @ts-ignore
    const { id } = await req.json();
    try {
      const response = await db.delete(users).where(eq(users.id, id));
      return NextResponse.json({ message: "Users deleted", response });
    } catch (error) {
      return NextResponse.json({ message: "Error happened", error });
    }
  } else {
    return NextResponse.json({ Error: "Error happening" });
  }
}
