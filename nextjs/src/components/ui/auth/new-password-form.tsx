"use client";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { NewPasswordSchema, ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";
import { Button } from "../button";
import { FormError } from "../form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import Link from "next/link";
import { reset } from "@/actions/reset";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

const NewPasswordSchemaClient = NewPasswordSchema.extend({
  confirmPassword: z.string().min(1, { message: "Password is required" }),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});

export const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof NewPasswordSchemaClient>>({
    resolver: zodResolver(NewPasswordSchemaClient),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchemaClient>) => {
    setSuccess("");
    setError("");

    startTransition(async () => {
      const res = await newPassword(values, token);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        setSuccess(res.success);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot you password?"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        disabled={isPending}
                        placeholder="••••••••"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        disabled={isPending}
                        placeholder="••••••••"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
