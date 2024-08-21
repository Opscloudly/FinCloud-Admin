import { redirect } from "next/navigation";

export default function AuthNullPage() {
  redirect("/auth/login");
  return null;
}
