"use client";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [isPending, startTransition] = useTransition();

  const [showTwoFactor, setShowTwoFactor] = useState<Boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setSuccess("");
    setError("");

    startTransition(async () => {
      try {
        const res = await login(values);
        if (res?.error) {
          form.reset();
          setError(res.error);
        }
        if (res?.success) {
          form.reset();
          setSuccess(res.success);
        }
        if (res?.twoFactor) {
          setShowTwoFactor(true);
        }
      } catch (error) {
        setError("Something went wrong!");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            disabled={isPending}
                            placeholder="john.doe@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            disabled={isPending}
                            placeholder="********"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </>
            )}
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>2FA Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="123456"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button className="px-0 font-normal" size="sm" variant="link">
            <Link href="/auth/reset">Forgot password?</Link>
          </Button>
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
