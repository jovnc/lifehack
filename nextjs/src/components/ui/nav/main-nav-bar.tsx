import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../button";
import { LoginRegisterButton } from "./login-register-buttons";
import SignOutButton from "../auth/sign-out-button";
import { UserProfileButton } from "./user-profile-button";

export function MainNavBar({ signedIn }: { signedIn: boolean }) {
  const linkActive = "text-foreground transition-colors hover:text-foreground";
  const linkInactive =
    "text-muted-foreground transition-colors hover:text-foreground";

  return (
    <nav className="w-full sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex w-full justify-between">
        <div className="w-full mt-2">
          <div className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Lifehack 2024</span>
            </Link>
            <Link href="/" className={linkActive}>
              Home
            </Link>
            <Link
              href="/protected"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            {signedIn && (
              <Link href="/protected/products" className={linkInactive}>
                Products
              </Link>
            )}
            {signedIn && (
              <Link href="/protected/ingredients" className={linkInactive}>
                Ingredients
              </Link>
            )}
            {signedIn && (
              <Link href="/protected/transactions" className={linkInactive}>
                Transactions
              </Link>
            )}
            {signedIn && (
              <Link href="/protected/chatbot" className={linkInactive}>
                Chatbot
              </Link>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Orders
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Products
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Customers
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex w-full gap-4 justify-end">
          {!signedIn && <LoginRegisterButton />}
          {signedIn && <SignOutButton />}
          {signedIn && <UserProfileButton />}
        </div>
      </div>
    </nav>
  );
}
