import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import type { FormRegister as FormRegisterType } from "../Types";
import Register from "../service/Register";

export default function FormRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormRegisterType>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { username, email, password } = formData;

    try {
      const response = await Register.register(username, email, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
        setError(null);
        navigate("/today");
      } else {
        setError(response.error || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  }

  return (
    <div className="flex flex-col gap-4 w-80">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm">
              Name
            </label>
            <input
              id="username"
              type="text"
              placeholder="Name"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                setError(null);
              }}
              className="border outline-none py-2 px-4 rounded-lg text-sm transition-all duration-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setError(null);
              }}
              className="border outline-none py-2 px-4 rounded-lg text-sm transition-all duration-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setError(null);
              }}
              className="border outline-none py-2 px-4 rounded-lg text-sm transition-all duration-300"
            />
          </div>
        </div>
        <Button title="Register" className="rounded-lg" />
        <span className="flex items-center justify-center h-6 text-sm text-errorMsg">
          {error}
        </span>
      </form>
    </div>
  );
}
