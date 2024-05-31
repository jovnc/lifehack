import { auth } from "@/auth";
import { LoginButton } from "@/components/ui/auth/login-button";
import { RegisterButton } from "@/components/ui/auth/register-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MainNavBar } from "@/components/ui/nav/main-nav-bar";
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
    <div className="w-full px-10 py-20 grid grid-cols-2 gap-8 bg-red-50 rounded-b-3xl">
      <div className="flex flex-col gap-y-8 pl-16 py-4">
        <p className="text-3xl font-bold">Enhancing Food Security</p>
        <p className="text-sm">
          We harness the power of advanced algorithms to predict demand, manage
          inventory, and optimize logistics. Our innovative technology reduces
          food waste and streamlines supply chain processes, ensuring a
          sustainable and efficient food supply for all.
        </p>
        <div>
          <Button>
            <Link href="/protected">Get Started</Link>
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Image
          src="/assets/images/burger.PNG"
          alt="Auth image"
          width={400}
          height={200}
          className="object-contain"
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
      <div className="w-full flex flex-row gap-x-10 justify-between">
        <div className="flex w-full flex-col gap-4 items-center ">
          <Image
            src="/assets/images/inventory.jpeg"
            alt="Inventory"
            className="rounded-full w-32 h-32 object-cover"
            width={10}
            height={10}
            unoptimized={true}
          />
          <p className="font-bold">1. Manage Inventory</p>
          <p className="text-center text-gray-500 text-sm">
            Accurate predictions help you to schedule your next inventory
            restock.
          </p>
        </div>
        <div className="flex w-full flex-col gap-4 items-center justify-center">
          <Image
            src="/assets/images/foodwaste.jpeg"
            alt="Food waste"
            className="rounded-full w-32 h-32 object-cover"
            width={10}
            height={10}
            unoptimized={true}
          />
          <p className="font-bold ">2. Reduce Waste</p>
          <p className="text-center text-gray-500 text-sm">
            Predict your store's demand based on previous sales.
          </p>
        </div>
        <div className="flex w-full flex-col gap-4 items-center ">
          <Image
            src="/assets/images/profits.jpeg"
            alt="Food waste"
            className="rounded-full w-32 h-32 object-cover"
            width={10}
            height={10}
            unoptimized={true}
          />
          <p className="font-bold">3. Increase Profits</p>
          <p className="text-center text-gray-500 text-sm">
            Reduce costs from inventory holding and food waste.
          </p>
        </div>
      </div>
    </div>
  );
}
