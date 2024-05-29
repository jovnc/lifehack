import { LoginButton } from "../auth/login-button";
import { RegisterButton } from "../auth/register-button";
import { Button } from "../button";

export function LoginRegisterButton() {
  return (
    <div className="flex w-full justify-end gap-4">
      <LoginButton>
        <Button size="sm">Login</Button>
      </LoginButton>
      <RegisterButton>
        <Button variant="outline" size="sm">
          Register
        </Button>
      </RegisterButton>
    </div>
  );
}
