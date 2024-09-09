type ToastProps = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToastProps) {
  return (
    <div
      className="fixed bottom-4 right-4 bg-redColor text-white p-4 rounded-lg shadow-lg flex items-center gap-2"
      style={{ zIndex: 1000 }}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto text-xl">
        &times;
      </button>
    </div>
  );
}
