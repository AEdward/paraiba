"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hashPassword } from "@/lib/password";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function createUser(_prevState: { error?: string }, formData: FormData) {
  await requireSession();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Name, email, and password are all required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "A user with that email already exists." };
  }

  await db.user.create({ data: { name, email, passwordHash: await hashPassword(password) } });
  revalidatePath("/admin/users");
  return {};
}

export async function deleteUser(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing user id.");
  if (id === session.userId) throw new Error("You can't delete your own account.");
  await db.user.delete({ where: { id } });
  redirect("/admin/users");
}
