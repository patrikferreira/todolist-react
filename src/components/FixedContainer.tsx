import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function FixedContainer({ children }: Props) {
  return (
    <div className="min-w-full min-h-full flex justify-center">
      <div className="w-full max-w-[1024px] flex flex-col gap-4">{children}</div>
    </div>
  );
}
