"use client";

import React from "react";
import { Button } from "../button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button className="w-full font-normal" variant="link" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
