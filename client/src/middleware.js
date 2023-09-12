import { NextResponse } from "next/server";

export default function middleware(req) {
  const authenticated = req.cookies.get("session");
  const { pathname, origin } = req.nextUrl;

  if (!authenticated && pathname != "/") {
    return NextResponse.redirect(new URL("/"));
  }

  if (authenticated && pathname == `${origin}/`) {
    return NextResponse.redirect(`${origin}/FlashCards`);
  }
}

export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
