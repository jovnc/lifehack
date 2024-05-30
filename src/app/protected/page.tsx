import { auth } from "@/auth";
import React from "react";

export default async function page() {
  const session = await auth();
  return (
    <main className="w-full flex min-h-screen text-wrap">
      <p className="break-all">{JSON.stringify(session)}</p>
    </main>
  );
}
