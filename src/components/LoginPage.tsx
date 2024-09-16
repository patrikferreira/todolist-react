import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

type FormData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const ctx = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/myday");
  }

  return (
    <div
      className={`loginBackground flex flex-col justify-between items-center p-4 min-h-screen w-full animate-fade-in-left bg-lightColor`}
    >
      <Logo />
      <div className="flex flex-col gap-6 rounded-xl justify-center">
        <h1 className="text-4xl font-semibold">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              className="outline-accent py-2 px-4 bg-base rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="text"
              placeholder="Password"
              className="outline-accent py-2 px-4 bg-base rounded-xl"
            />
          </div>

          <button className="bg-firstColor p-2 mt-4 text-lightColor rounded-xl transition-all duration-300 hover:brightness-75">
            Login
          </button>

          <div className="flex justify-between items-center px-2">
            <a href="/">Lost your password?</a>
            <a href="/">Sign up</a>
          </div>
        </form>
      </div>

      <div className="text-sm flex flex-col items-center gap-2">
        <span className="h-10"></span>
        <span>
          © 2024 JustDO - Powered by <a href="">Patrik Ferreira</a> and{" "}
          <a href="">Mario Zeller</a>
        </span>
      </div>
    </div>
  );
}
