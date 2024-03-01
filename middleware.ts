import { NextRequest, NextResponse } from "next/server";
// If the incoming request has the "token" cookie
export function middleware(request: NextRequest) {
  const has_token =
    request.cookies.get("spotify_token")?.name &&
    request.cookies.get("google_token")?.name;

  const { pathname } = request.nextUrl;

  if (!has_token) {
    request.nextUrl.pathname = "/";
    return NextResponse.redirect(request.nextUrl);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: []
};
