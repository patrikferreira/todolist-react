import { createContext, ReactNode, useState } from "react";

type User = {
  id: string;
  name: string;
};

type UserCtx = {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
};

type Props = {
  children: ReactNode;
};

export const UserContext = createContext<UserCtx>({} as UserCtx);

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User>({} as User);
  const [token, setToken] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser, token }}>
      {children}
    </UserContext.Provider>
  );
}
