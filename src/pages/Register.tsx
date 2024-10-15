import Copyright from "../components/Copyright";
import FormRegister from "../components/FormRegister";
import Logo from "../components/Logo";

export default function Register() {
  return (
    <div
      className={`flex flex-col min-h-screen w-full items-center justify-between loginBackground p-2 md:p-4`}
    >
      <a href="/login">
        <Logo />
      </a>
      <FormRegister />
      <Copyright />
    </div>
  );
}
