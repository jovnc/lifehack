"use client";
import React from "react";
import { Button } from "../button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Social() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button className="w-full" variant="outline" onClick={() => {}}>
        <FcGoogle className="h-5 w-5" onClick={() => onClick("google")} />
      </Button>
      <Button className="w-full" variant="outline" onClick={() => {}}>
        <FaGithub className="h-5 w-5" onClick={() => onClick("github")} />
      </Button>
    </div>
  );
}
