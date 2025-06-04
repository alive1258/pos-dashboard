// import { NextResponse } from "next/server";

// const accessTokenWithoutPath = [
//   "/sign-in",
//   "/forget-password",
//   "/otp",
//   "/reset-password",
//   "/sign-up",
//   "/verify-otp",
// ];

// export async function middleware(request) {
//   const adminAccessToken = request.cookies.get("refreshToken")?.value;
//   const { pathname } = request.nextUrl;
//   console.log("pathname..............", pathname);

//   // Allow specific routes without authentication
//   const isAccessWithoutToken = accessTokenWithoutPath.some((path) =>
//     pathname.includes(path)
//   );

//   if (isAccessWithoutToken) {
//     return NextResponse.next();
//   }
//   console.log(isAccessWithoutToken, "isAccessWithoutToken");

//   // Redirect logged-in users away from the login page
//   if (pathname === "/sign-in" && adminAccessToken) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Redirect users without access tokens away from protected routes
//   // if (!adminAccessToken && !isAccessWithoutToken) {
//   //   return NextResponse.redirect(new URL("/sign-in", request.url));
//   // }

//   // Allow access to all other routes
//   return NextResponse.next();
// }

import { NextResponse } from "next/server";

// Paths that do not require authentication
const publicPaths = [
  "/sign-in",
  "/forget-password",
  "/otp",
  "/reset-password",
  "/sign-up",
  "/verify-otp",
];

export async function middleware(request) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  // Skip static file requests (e.g., favicon, JS, CSS)
  if (pathname.startsWith("/_next/") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  // Allow specific routes without authentication
  const isAccessWithoutToken = publicPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isAccessWithoutToken) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from the login page
  if (pathname === "/sign-in" && refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect users without a refresh token to the sign-in page
  if (!refreshToken && !isAccessWithoutToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow access to all other routes
  return NextResponse.next();
}
