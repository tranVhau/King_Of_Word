import { NextResponse } from "next/server";

export default function middleware(req) {
  const authenticated = req.cookies.get("session");
  const { pathname } = req.nextUrl;

  if (!authenticated && pathname != "/") {
    return NextResponse.redirect(new URL("http://localhost:3000/"));
  }

  if (authenticated && pathname == "/") {
    return NextResponse.redirect("http://localhost:3000/FlashCards");
  }
}

export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
