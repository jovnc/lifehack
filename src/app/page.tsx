import { auth } from "@/auth";
import { LoginButton } from "@/components/ui/auth/login-button";
import { RegisterButton } from "@/components/ui/auth/register-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MainNavBar } from "@/components/ui/nav/main-nav-bar";
import {
  Apple,
  BriefcaseIcon,
  CircleDollarSignIcon,
  PizzaIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col">
      <MainNavBar signedIn={!!session} />
      <StartPage />
      <WhyUseUsCard />
    </main>
  );
}

function AuthCard() {
  return (
    <Card className="space-y-8 p-10">
      <h1 className="font-bold text-2xl text-center">🔐 Auth</h1>
      <p className="text-md font-light drop-shadow-md">
        A simple authentication service.
      </p>
      <div className="flex flex-row justify-between">
        <LoginButton>
          <Button>Login</Button>
        </LoginButton>
        <RegisterButton>
          <Button variant="outline">Register</Button>
        </RegisterButton>
      </div>
    </Card>
  );
}

function StartPage() {
  return (
    <div className="w-full px-10 py-20 grid grid-cols-2 gap-8 bg-red-50">
      <div className="flex flex-col gap-y-8 pl-10 py-4">
        <p className="text-5xl font-bold">Enhancing Food Security</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          voluptatem beatae eum, quidem consequuntur provident aut laudantium
          blanditiis alias incidunt illum praesentium doloremque dolorum
          officiis veritatis nostrum natus labore dolores!
        </p>
        <div>
          <Button>
            <Link href="/protected">Get Started</Link>
          </Button>
        </div>
      </div>
      <div className="w-full">
        <Image
          src="/assets/images/burger.PNG"
          alt="Auth image"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}

function RestaurantCard() {
  return (
    <div className="w-full p-10 flex flex-col gap-8 px-20">
      <div className="flex flex-col gap-y-8 py-4">
        <p className="text-2xl font-bold text-center">Restaurants</p>
      </div>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col w-full gap-4 items-center ">
          <Image
            src="/assets/images/rest.jpeg"
            alt="Auth image"
            className="rounded-full w-48 h-48"
            width={200}
            height={200}
          />
          <p className="font-bold">Restaurant 1</p>
        </div>
        <div className="flex flex-col gap-4 items-center w-full  ">
          <Image
            src="/assets/images/rest.jpeg"
            alt="Auth image"
            className="rounded-full w-48 h-48"
            width={200}
            height={200}
          />
          <p className="font-bold">Restaurant 2</p>
        </div>
        <div className="flex w-full flex-col gap-4 items-center ">
          <Image
            src="/assets/images/rest.jpeg"
            alt="Auth image"
            className="rounded-full w-48 h-48"
            width={200}
            height={200}
          />
          <p className="font-bold">Restaurant 3</p>
        </div>
      </div>
    </div>
  );
}

function WhyUseUsCard() {
  return (
    <div className="w-full p-12 flex flex-col gap-8 px-20">
      <div className="flex flex-col gap-y-8 py-4">
        <p className="text-2xl font-bold text-center">Why Us?</p>
      </div>
      <div className="w-full flex flex-row justify-between">
        <div className="flex w-full flex-col gap-4 items-center ">
          <BriefcaseIcon className="w-24 h-24" />
          <p className="font-bold">1. Minimise inventory cost</p>
        </div>
        <div className="flex w-full flex-col gap-4 items-center ">
          <PizzaIcon className="w-24 h-24" />
          <p className="font-bold">2. Reduce food wastage</p>
        </div>
        <div className="flex w-full flex-col gap-4 items-center ">
          <CircleDollarSignIcon className="w-24 h-24" />
          <p className="font-bold">3. Increase Profits</p>
        </div>
      </div>
    </div>
  );
}
