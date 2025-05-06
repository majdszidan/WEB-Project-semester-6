import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const verified = await verifyUser(
    request.cookies.get("token")?.value?.toString() ?? ""
  );

  console.log(verified);

  if (!verified && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (verified && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

async function verifyUser(token: string) {
  try {
    const keys = await (
      await fetch(
        "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com",
        { next: { revalidate: 3600 } }
      )
    ).json();
    const jwtHeader = jose.decodeProtectedHeader(token);
    const jwt = await jose.jwtVerify(
      token,
      await jose.importX509(keys[jwtHeader.kid!], "RS256")
    );

    if (jwt.payload.exp && jwt.payload.exp > Date.now() / 1000) {
      return true;
    }
  } catch {}
  return false;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
