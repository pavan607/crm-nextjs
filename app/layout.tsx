// app/layout.tsx
import './globals.css';
import Image from "next/image";
// import Link from "next/link";
import { ReactNode } from "react";
import type { Metadata } from 'next';
import "bootstrap/dist/css/bootstrap.min.css";
import LogoutButton from "./components/LogoutButton";
import CollapsibleSidebar from "./././components/CollapsibleSidebar";

export const metadata: Metadata = {
  title: "CRM",
  description: "Employee management and documentation system",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden grid grid-rows-[auto_1fr_auto] grid-cols-[240px_1fr]">
        {/* Header */}
        <header className="col-span-2 flex items-center justify-between px-6 py-2.5 bg-gray-900 text-white">
          <div className="flex items-center gap-2">
            <Image src="/company_logo.png" alt="Logo" width={110} height={60}  />
            {/* <span className="font-bold text-lg">CRM</span> */}
          </div>

          {/* Logout Button */}
          <LogoutButton />
        </header>

        {/* Sidebar */}
        <CollapsibleSidebar />

        {/* Main Content */}
        <main className="p-4 bg-white text-black overflow-y-auto">

          {children}
        </main>

        {/* Footer */}
        <footer className="col-span-2 bg-gray-900 text-gray-300 p-1 text-center text-sm">
          © {new Date().getFullYear()} My CRM App. All rights reserved.
        </footer>
      </body>
    </html>
  );
}