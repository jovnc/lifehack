import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRobot } from "react-icons/fa";

export function ChatBotReply({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row gap-8 w-full">
      <Avatar>
        <FaRobot size={24} />
      </Avatar>
      <div className="flex flex-col gap-2">
        <p className="font-bold">Chatbot</p>
        <p>{children}</p>
      </div>
    </div>
  );
}

export function YourQuery({
  children,
  avatar,
  username,
}: {
  children: React.ReactNode;
  avatar?: string | null;
  username?: string | null;
}) {
  if (!username) {
    return null;
  }
  const avatarInitials = username.toUpperCase();
  return (
    <div className="flex flex-row justify-end gap-8 w-full">
      <div className="flex flex-col gap-2">
        <p className="font-bold">You ({username})</p>
        <p>{children}</p>
      </div>
      <Avatar>
        {avatar && <AvatarImage src={avatar} />}
        <AvatarFallback>{avatarInitials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
