import { ReactNode } from "react";

type Props = {
  img?: ReactNode;
  title?: string;
  className?: string;
};

export default function NoContent({ img, title, className }: Props) {
  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="flex flex-col items-center gap-4">
        <div className={` ${className}`}>{img}</div>
        <p className="text-sm text-secondColor">{title}</p>
      </div>
    </div>
  );
}
