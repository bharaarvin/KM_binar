import { NextResponse } from "next/server";

export default function middleware(req) {
  const { access_token } = req.cookies;
  const pageUnauth = ["/login", "/register", "/"];
  const url = req.nextUrl.clone();
  const pathSource = /(\/_next\/)|(\/api\/)|(\.[a-zA-Z0-9]+$)|(\/product\/[0-9]*$)/;

  if (pathSource.test(url.pathname)) return NextResponse.next();

  if (access_token && pageUnauth.includes(url.pathname)) {
    if (url.pathname === "/") return NextResponse.next();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!access_token && !pageUnauth.includes(url.pathname)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
