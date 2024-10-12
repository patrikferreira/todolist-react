{/* TODO: login with google/github */}

import { useState } from "react";
import { FormDataLogin } from "../Types";
import Button from "./Button";
import Anchor from "./Anchor";
import AuthService from "../service/AuthService";
import { useNavigate } from "react-router-dom";

export default function FormLogin() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataLogin>({
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  });
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await AuthService.login(formData.email, formData.password);
    if (result.token) {
      localStorage.setItem("token", result.token);
      setError(null)
      navigate("/today")
    } else {
      setError(result.error || "Unknown error");
    }
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
              type="text"
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
              type="text"
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
        <div className="flex items-center justify-between">
          <Anchor
            title="Lost your password?"
            route="/"
            className="hover:text-accent"
          />
          <Anchor title="Sign up" route="/" className="hover:text-accent" />
        </div>
        <Button title="Login" className="rounded-lg" />
        <span className="flex items-center justify-center h-6 text-sm text-errorMsg">
            {error}
        </span>
      </form>
    </div>
  );
}
