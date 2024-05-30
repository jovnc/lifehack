import { auth } from "@/auth";
import { LoginButton } from "@/components/ui/auth/login-button";
import { RegisterButton } from "@/components/ui/auth/register-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MainNavBar } from "@/components/ui/nav/main-nav-bar";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col">
      <MainNavBar signedIn={!!session} />
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
