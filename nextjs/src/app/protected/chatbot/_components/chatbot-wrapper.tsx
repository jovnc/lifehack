"use client";

import { useState } from "react";
import { ChatBotReply, YourQuery } from "./chatbot-query";
import { ChatBotForm } from "./chatbot-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ChatbotWrapper({
  session,
  stringJSON,
}: {
  session: any;
  stringJSON: string;
}) {
  const userAvatarUrl = session?.user?.image;
  const username = session?.user?.name;
  const [history, setHistory] = useState<string[][]>([]);
  const [apiKey, setApiKey] = useState<string>("");

  return (
    <div className="flex flex-col w-full gap-6 ">
      {history.length == 0 && <ChatBotIntro />}
      {!apiKey && history.length == 0 && <ApiKeyForm setApiKey={setApiKey} />}
      {history &&
        history.map(([type, message], index) => {
          if (type === "user") {
            return (
              <YourQuery key={index} avatar={userAvatarUrl} username={username}>
                {message}
              </YourQuery>
            );
          }
          return <ChatBotReply key={index}>{message}</ChatBotReply>;
        })}
      <ChatBotForm
        disabledOn={apiKey == ""}
        setHistory={setHistory}
        apiKey={apiKey}
        setApiKey={setApiKey}
        stringJSON={stringJSON}
      />
    </div>
  );
}

function ApiKeyForm({ setApiKey }: { setApiKey: any }) {
  const [s, setS] = useState<string>("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (s) {
      setApiKey(s);
      toast.success("API key added successfully: " + s);
    }
  };
  return (
    <div className="w-full flex flex-row gap-2">
      <p className="text-sm text-gray-500 text-right pl-20">
        Enter your OpenAI API key:
      </p>
      <Input onChange={(e) => setS(e.target.value)} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

function ChatBotIntro() {
  return (
    <>
      <div className="font-bold text-md text-right">
        {"Welcome to the chatbot!"}
      </div>

      <div className="text-sm text-gray-500 text-right pl-20">
        {
          "Here, you can use your sales and inventory data to gain valuable business insights through our AI model's quantitative data analysis."
        }
      </div>

      <div className="text-sm text-gray-500 text-right pl-20">
        {
          "Example prompt: Please suggest some ways my store can reduce food waste, given the current sales trends."
        }
      </div>
      <div className="text-sm text-gray-500 text-right pl-20">
        {
          "Enter your OpenAI API Key to get started, make sure that your key is valid."
        }
      </div>
    </>
  );
}
