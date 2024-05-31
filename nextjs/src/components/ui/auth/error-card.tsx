import React from "react";
import { Card, CardFooter, CardHeader } from "../card";
import { Header } from "./header";
import BackButton from "./back-button";

export default function ErrorCard() {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops! Something went wrong!" />
      </CardHeader>
      <CardFooter>
        <BackButton href="/auth/login" label="Go back to login" />
      </CardFooter>
    </Card>
  );
}
