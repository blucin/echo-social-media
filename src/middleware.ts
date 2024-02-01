import { auth } from "@/auth";
import {
  DEFAULT_SIGNIN_REDIRECT,
  AUTH_ROUTE,
  PROFILE_ROUTE,
  publicRoutes,
  privateRoutes,
  apiAuthPrefix,
} from "@/routes";

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
    // Skip authentication for API routes
    return;
  }

  if (nextUrl.pathname.startsWith(AUTH_ROUTE)) {
    // Skip authentication for sign in page
    return;
  }

  if (publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    // Skip authentication for public routes if the user is logged out
    return;
  }

  if (privateRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    // Redirect to sign in page for private routes if the user is logged out
    return Response.redirect(new URL(AUTH_ROUTE, nextUrl));
  }
  
  const session = await auth();
  if (!session) {
    // Redirect to sign in page if the user is logged out
    return Response.redirect(new URL(AUTH_ROUTE, nextUrl));
  }

  let hasFilledOutProfile = true;
  if (
    session.user.username === null ||
    session.user.username === undefined ||
    session.user.username.trim() === ""
  ) {
    hasFilledOutProfile = false;
  }

  if (hasFilledOutProfile && nextUrl.pathname.startsWith(PROFILE_ROUTE)) {
    // Redirect to home page if the user is logged in and trying to access the profile page
    return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
  }
  
  if (nextUrl.pathname.startsWith(PROFILE_ROUTE) && !hasFilledOutProfile) {
    // Skip authentication for profile page if the user is logged in but has not filled out their profile
    return;
  }

  if (!hasFilledOutProfile) {
    // Redirect to profile page if the user is logged in but has not filled out their profile
    return Response.redirect(new URL(PROFILE_ROUTE, nextUrl));
  }

  // If the user is logged in and has filled out their profile, continue
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
