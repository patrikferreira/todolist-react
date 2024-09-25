import Header from "./Header";
import UnderConstruction from "./UnderConstruction";

export default function Notes() {
  return (
    <div
      className={`flex flex-col gap-4 w-full animate-fade-in-left transition-all duration-300 p-4`}
    >
      <Header />
      <div className="h-full w-full flex items-center justify-center">
        <UnderConstruction />
      </div>
    </div>
  );
}
