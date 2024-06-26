"use client";

import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ChatBotFormSchema = z.object({
  message: z.string().min(1, { message: "Message is required" }),
});

export function ChatBotForm({
  setHistory,
  disabledOn,
  apiKey,
  setApiKey,
  stringJSON,
}: {
  setHistory: React.Dispatch<React.SetStateAction<string[][]>>;
  disabledOn?: boolean;
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  stringJSON: string;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ChatBotFormSchema>>({
    resolver: zodResolver(ChatBotFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof ChatBotFormSchema>) => {
    setHistory((prev) => [...prev, ["user", data.message]]);
    startTransition(async () => {
      const res = await sendNormalPrompt(data.message, apiKey, stringJSON);

      if (res?.error) {
        toast.error("Make sure OpenAI API Key is correct and valid.");
        setApiKey("");
        setHistory([]);
      } else {
        const message = res?.response?.choices[0]?.message?.content;
        setHistory((prev) => [...prev, ["bot", message || ""]]);
      }
      // timeout 1s
      // await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="message"
          render={({ field }: { field: any }) => (
            <div className="relative w-full">
              <Input
                className="pr-10"
                disabled={isPending || disabledOn}
                placeholder="Enter your message"
                type="text"
                {...field}
              />
              <Button
                className="absolute top-1/2 right-2 -translate-y-1/2"
                size="icon"
                type="submit"
                disabled={isPending || disabledOn}
                variant="ghost"
              >
                <ArrowRightIcon className="h-5 w-5" />
                <span className="sr-only">Submit</span>
              </Button>
            </div>
          )}
        />
      </form>
    </Form>
  );
}

import { Button } from "@/components/ui/button";
import { sendNormalPrompt } from "@/actions/openai";
import { toast } from "sonner";

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
