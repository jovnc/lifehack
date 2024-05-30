import { auth } from "@/auth";
import React from "react";
import { ChatbotWrapper } from "./_components/chatbot-wrapper";

export default async function page() {
  const session = await auth();

  return (
    <main className="w-full flex min-h-screen text-wrap">
      <div className="flex flex-col w-full gap-8">
        <ChatbotWrapper session={session} />
      </div>
    </main>
  );
}
