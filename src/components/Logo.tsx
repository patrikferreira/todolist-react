type Props = {
  smallSize?: boolean;
};

export default function Logo({ smallSize }: Props) {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/src/assets/jata.png"
        alt=""
        className={`rounded-lg ${smallSize ? "h-8" : "h-12"}`}
      />
      <h1
        className={`font-semibold text-accent ${
          smallSize ? "text-xl" : "text-3xl"
        }`}
      >
        JaTa
      </h1>
    </div>
  );
}
