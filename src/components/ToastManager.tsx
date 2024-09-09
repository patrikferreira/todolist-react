import { useState, useEffect } from "react";
import Toast from "./Toast";

type ToastManagerProps = {
  message: string;
  duration?: number;
};

export default function ToastManager({ message, duration = 3000 }: ToastManagerProps) {
  const [visible, setVisible] = useState<boolean>(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && <Toast message={message} onClose={handleClose} />}
    </>
  );
}
