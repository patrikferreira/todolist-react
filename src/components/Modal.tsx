import { IoCloseOutline } from "react-icons/io5";
import SmallButton from "./SmallButton";

type ModalProps = {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({ onClose, title, children }: ModalProps) {
  return (
    <div
      className="fixed top-0 left-0 min-h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-lightColor rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-h-fit w-72 md:w-96 rounded-lg flex flex-col overflow-hidden">
          <div className="flex justify-between items-center p-2 border-b">
            <p className="text-sm px-2 font-semibold">{title}</p>
            <SmallButton icon={<IoCloseOutline />} action={onClose} />
          </div>
          <div className="h-full w-full p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
