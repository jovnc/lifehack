"use client";

import { useState } from "react";
import { ChatBotReply, YourQuery } from "./chatbot-query";
import { ChatBotForm } from "./chatbot-form";

export function ChatbotWrapper({ session }: { session: any }) {
  const userAvatarUrl = session?.user?.image;
  const username = session?.user?.name;
  const [history, setHistory] = useState<string[][]>([]);
  return (
    <div className="flex flex-col w-full gap-6">
      {history &&
        history.map(([type, message], index) => {
          if (type === "user") {
            return (
              <YourQuery avatar={userAvatarUrl} username={username}>
                {message}
              </YourQuery>
            );
          }
          return <ChatBotReply>{message}</ChatBotReply>;
        })}
      <ChatBotForm setHistory={setHistory} />
    </div>
  );
}
