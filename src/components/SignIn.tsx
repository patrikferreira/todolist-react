import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
import Separator from "./Separator";
import { FcGoogle } from "react-icons/fc";

type FormData = {
  username: string;
  password: string;
};

export default function SignIn() {
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
      {/* logo */}
      <h1 className="text-3xl font-semibold">Logo</h1>
      {/* login container */}
      <div className="flex flex-col gap-6 rounded-xl justify-center">
        <h1 className="text-4xl font-semibold">Sign in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              className="border outline-none py-2 px-4 rounded-xl text-sm transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm">Password</label>
            <input
              id="password"
              type="text"
              placeholder="Password"
              className="border outline-none py-2 px-4 rounded-xl text-sm transition-all duration-300"
            />
          </div>

          <button className="bg-firstColor text-sm p-2 mt-4 text-lightColor rounded-xl transition-all duration-300">
            Sign in
          </button>

          <div className="flex justify-between items-center px-2">
            <a href="/" className="text-sm">Lost your password?</a>
            <a href="/" className="text-sm">Sign up</a>
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
          © 2024 Todo List - Powered by <a href="">Patrik Ferreira</a> and{" "}
          <a href="">Mario Zeller</a>
        </span>
      </div>
    </div>
  );
}
