import Header from "./Header";
import NoContent from "./NoContent";

export default function Notes() {
  return (
    <div
      className={`flex flex-col gap-4 w-full animate-fade-in-left transition-all duration-300 p-4`}
    >
      <Header />
      <div className="h-full w-full flex items-center justify-center">
      <NoContent className="h-32 md:h-40" img={<img src="/src/assets/building.svg" className="h-full" alt="" />} title="Building" />
      </div>
    </div>
  );
}
