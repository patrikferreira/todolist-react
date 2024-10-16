import { createContext, ReactNode, useState } from "react";
import { Task, TaskList, User } from "../Types";

type UserCtx = {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};

type Props = {
  children: ReactNode;
};

export const UserContext = createContext<UserCtx>({} as UserCtx);

export default function UserProvider({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    id: "123",
    name: "John Doe"
  });
  const [token, setToken] = useState<string | null>(null);

  function openSidebar() {
    setIsSidebarOpen(true);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <UserContext.Provider value={{ user, setUser, token, isSidebarOpen, openSidebar, closeSidebar }}>
      {children}
    </UserContext.Provider>
  );
}
