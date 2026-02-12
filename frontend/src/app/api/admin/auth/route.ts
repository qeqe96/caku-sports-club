import { NextRequest, NextResponse } from "next/server";
import { compareSync } from "bcryptjs";
import { createToken, getTokenCookieOptions, getLogoutCookieOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    // Support both plain text and bcrypt hashed passwords
    let isValid = false;
    if (adminPassword.startsWith("$2")) {
      isValid = username === adminUsername && compareSync(password, adminPassword);
    } else {
      isValid = username === adminUsername && password === adminPassword;
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Geçersiz kullanıcı adı veya şifre" },
        { status: 401 }
      );
    }

    const token = await createToken(username);
    const response = NextResponse.json({ success: true });
    response.cookies.set(getTokenCookieOptions(token));
    return response;
  } catch {
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(getLogoutCookieOptions());
  return response;
}
