import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
};

export default function Popover({ children, onClose, className }: Props) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className={`absolute z-50 min-w-fit min-h-fit bg-lightColor shadow-customShadow rounded-lg text-sm text-secondColor ${className}`}
    >
      {children}
    </div>
  );
}
