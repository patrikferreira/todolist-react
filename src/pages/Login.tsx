import Logo from "../components/Logo";
import FormLogin from "../components/FormLogin";
import Copyright from "../components/Copyright";

export default function Login() {
  return (
    <div
      className={`flex flex-col min-h-screen w-full items-center justify-between loginBackground p-2 md:p-4`}
    >
      <a href="/login">
        <Logo />
      </a>
      <FormLogin />
      <Copyright />
    </div>
  );
}
