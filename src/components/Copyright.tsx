import Anchor from "./Anchor";

export default function Copyright() {
  return (
    <div>
      <p className="text-sm">
        © 2024 JaTa - Powered by{" "}
        <Anchor title="Patrik Ferreira" route="https://www.linkedin.com/in/patrikferreira/" className="" /> and{" "}
        <Anchor title="Mario Zeller" route="https://www.linkedin.com/in/mariovanzeller/" className="" />
      </p>
    </div>
  );
}
