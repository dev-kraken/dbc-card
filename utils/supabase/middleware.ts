import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  apiAuthPrefix,
  authRoutes,
  DefaultLoginRedirect,
  publicRoutes,
} from "@/routes";

async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          updateCookies(request, response, name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          updateCookies(request, response, name, "", options);
        },
      },
    },
  );

  const { nextUrl } = request;

  try {
    const { data } = await supabase.auth.getUser();
    const isLoggedIn = !!data.user;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
      return response;
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL(DefaultLoginRedirect, nextUrl));
      }
      return response;
    }

    if (!isLoggedIn && !isPublicRoute) {
      return NextResponse.redirect(new URL("/sign-in", nextUrl));
    }
  } catch (error) {
    console.error("Error updating session:", error);
    return NextResponse.error();
  }

  return response;
}

function updateCookies(
  request: NextRequest,
  response: NextResponse,
  name: string,
  value: string,
  options: CookieOptions,
) {
  request.cookies.set({
    name,
    value,
    ...options,
  });
  response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  response.cookies.set({
    name,
    value,
    ...options,
  });
}

export { updateSession };
