import { auth } from "@/auth";
import React from "react";
import { ChatbotWrapper } from "./_components/chatbot-wrapper";
import { Card } from "@/components/ui/card";

export default async function page() {
  const session = await auth();
  const message = null;

  return (
    <main className="w-full flex min-h-screen text-wrap">
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold">Gain Business Insights</p>
          <p className="text-gray-500 text-xl">Based on your store's data</p>
        </div>
        <Card className="h-3/4 flex items-end overflow-y-auto">
          <div className="flex flex-col  w-full p-6 gap-8">
            <div className="font-bold text-md text-right">
              {message ? "" : "Welcome to the chatbot!"}
            </div>

            <div className="text-sm text-gray-500 text-right pl-20">
              {message
                ? ""
                : "Here, you can use your sales and inventory data to gain valuable business insights through our AI model's quantitative data analysis."}
            </div>

            <div className="text-sm text-gray-500 text-right pl-20">
              {message
                ? ""
                : "Example prompt: Please suggest some ways my store can reduce food waste, given the current sales trends."}
            </div>

            <ChatbotWrapper session={session} />
          </div>
        </Card>
      </div>
    </main>
  );
}
