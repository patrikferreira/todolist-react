import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Button from "./Button";
import Logo from "./Logo";
import Anchor from "./Anchor";
import AuthService from "../service/AuthService";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const ctx = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
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
      navigate("/myday");
    } else {
      setError(result.error || "Erro desconhecido");
    }

  }

  return (
    <div
      className={`loginBackground flex flex-col justify-between items-center p-4 min-h-screen w-full animate-fade-in-left bg-lightColor`}
    >
      <Logo className="text-3xl" />
      <div className="flex flex-col gap-6 rounded-xl justify-center">
        <h1 className="text-4xl font-semibold">Sign in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                console.log(formData.email)
                setError(null)
              }}
              className="border outline-none py-2 px-4 rounded-xl text-sm transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm">Password</label>
            <input
              id="password"
              type="text"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value })
                console.log(formData.password)
                setError(null)
              }}
              className="border outline-none py-2 px-4 rounded-xl text-sm transition-all duration-300"
            />
          <span className="h-5 flex justify-center items-center text-sm text-errorMsg">{error}</span>
          </div>

          <Button title="Sign in" className="rounded-xl" />

          <div className="flex justify-between items-center px-2">
            <Anchor title="Lost your password?" route="/" className="hover:text-accent" />
            <Anchor title="Sign up" route="/" className="hover:text-accent" />
          </div>
        </form>
        <button className="flex items-center justify-center gap-2 rounded-xl border py-2 cursor-pointer bg-lightColor transition-all duration-300 hover:brightness-95">
          <FcGoogle />
          <p className="
          text-sm font-semibold">Sign in with Google</p>
          </button>
      </div>

      <div className="text-sm flex flex-col items-center gap-2">
        <span>
          © 2024 Todo List - Powered by <Anchor title="Patrik Ferreira" route="/" className="" /> and{" "}
          <Anchor title="Mario Zeller" route="/" className="" />
        </span>
      </div>
    </div>
  );
}
