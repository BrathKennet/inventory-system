import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const authRequired = [
    "/",
    "/categories",
    "/clients",
    "/lots",
    "/products",
    "/sales",
    "/suppliers",
    "/transactions",
  ];
  const noAuthRequired = ["/login"];

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (
    !session &&
    authRequired.includes(`/${req.nextUrl.pathname.split("/")[1]}`)
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    session &&
    noAuthRequired.includes(`/${req.nextUrl.pathname.split("/")[1]}`)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}
