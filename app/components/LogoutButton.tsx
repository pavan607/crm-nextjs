"use client";

import { useRouter, usePathname } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide logout button on login page
  if (pathname === "/login") return null;

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
      title="Logout"
    >
      Logout
    </button>
  );
}
