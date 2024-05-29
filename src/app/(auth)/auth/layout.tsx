import { MainNavBar } from "@/components/ui/nav/main-nav-bar";

const AuthLayout = ({ children: children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavBar />
      <div className="w-full flex items-center justify-center p-24">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
