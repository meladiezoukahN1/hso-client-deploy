import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequestWithAuth) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }

  return withAuth(req, {
    pages: {
      signIn: "/auth/login",
      error: "/auth/login",
    },
  });
}

export const config = {
  matcher: [
    "/((?!auth/login|auth/VerifiedEmail|auth/repassword|_next/static|favicon.ico|Digital_Trans_Team/about_team/our_team|images|housing-request|housing-request/application-form|^/[^/]+\\.(?:png|jpe?g)$).*)",
  ],
};
