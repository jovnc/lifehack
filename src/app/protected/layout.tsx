import { auth } from "@/auth";
import { MainNavBar } from "@/components/ui/nav/main-nav-bar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

export default async function page({
  children: children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col">
      <MainNavBar signedIn={!!session} />
      <div className="w-full flex items-center justify-center p-14">
        {children}
      </div>
      <Toaster />
    </main>
  );
}
