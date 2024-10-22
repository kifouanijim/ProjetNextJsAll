"use server";

import { checkPassword } from "@/utils/bcryptjs";
import { NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { createCookie } from "@/utils/sessions";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const response = await login(email, password);

  if (!response) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 403 });
  }

  const sessionData = { rowid: response, email };
  await createCookie(sessionData);

  return NextResponse.json({ message: "Login successful" });
}

async function login(email: string, password: string) {
  const db = await open({
    filename: process.env.DATABASE_NAME || ":memory:",
    driver: sqlite3.Database,
  });

  try {
    const verif = "SELECT rowid, email, pwd FROM users WHERE email = ?";
    const userVerif = await db.get(verif, email);

    if (!userVerif) {
      return false;
    }

    const isPasswordValid = await checkPassword(password, userVerif.pwd);

    if (!isPasswordValid) {
      return false;
    }

    return userVerif.rowid;
  } finally {
    await db.close();
  }
}
