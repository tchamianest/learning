import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  let token = req.cookies.get("next-auth.session-token");
  let url = new URL(req.url);

  if (!token && url.pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && (url.pathname === "/login" || url.pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/"],
};
