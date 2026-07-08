interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function Spinner({
  size = "md",
  text,
}: SpinnerProps) {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-[3px]",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <div
        className={`
          ${sizes[size]}
          rounded-full
          border-blue-600
          border-t-transparent
          animate-spin
        `}
      />

      {text && (
        <p className="text-sm text-slate-500">
          {text}
        </p>
      )}
    </div>
  );
}