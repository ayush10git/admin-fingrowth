import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/dashboard",
  "/dashboard(.*)",
  "/profile"
]);

// Define public API routes
const isPublicApiRoute = createRouteMatcher(["/api/blog", "/api/image-upload","/api/waitlist"]);

// Middleware logic
export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const currentUrl = new URL(req.url);
  const pathname = currentUrl.pathname;
  const isAccessingDashboard = pathname.startsWith("/dashboard");
  const isApiRequest = pathname.startsWith("/api");

  // If user is logged in and accessing a public route but not the dashboard
  if (userId && isPublicRoute(req) && !isAccessingDashboard) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If user is not logged in
  if (!userId) {
    // If user is not logged in and trying to access a protected route
    if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // If the request is for a protected API and the user is not logged in
    if (isApiRequest && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
});

// Middleware matcher configuration
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Match all routes except static files and Next.js internals
    "/(api|trpc)(.*)",
    "/dashboard/:path*", // Enable dynamic segments under /dashboard
  ],
};
