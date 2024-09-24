type Props = {
    className?: string;
  };
  
  export default function UnderConstruction({ className }: Props) {
    return (
      <div className={`rounded-lg flex flex-col gap-2 text-center text-baseColor ${className}`}>
        <div className="text-3xl">🚧</div>
        <h2 className="text-lg font-semibold">
          Feature Under Development
        </h2>
        <p className="text-sm">
          This feature is still under development and will be available soon.
        </p>
      </div>
    );
  }
  