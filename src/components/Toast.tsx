type ToastProps = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToastProps) {
  return (
    <div
      className="fixed bottom-4 right-4 bg-redColor p-3 rounded-lg shadow-customShadow flex items-center min-w-fit gap-2 bg-accent text-lightColor text-xs"
      style={{ zIndex: 1000 }}
    >
      <span>{message}</span>
      <button onClick={onClose} className="text-sm">
        &times;
      </button>
    </div>
  );
}
