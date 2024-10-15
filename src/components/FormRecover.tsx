import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function FormRecover() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col gap-4 w-80">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              className="border outline-none py-2 px-4 rounded-lg text-sm transition-all duration-300"
            />
          </div>
        </div>
        <Button title="Recover Password" className="rounded-lg" />
        <span className="flex items-center justify-center h-6 text-sm text-errorMsg">
          {error}
        </span>
      </form>

    </div>
  );
}
