interface Props {
  children: React.ReactNode;
  variant?: "ok" | "error" | "warning" | "info" | "neutral";
  size?: "sm" | "xs";
}

const styles: Record<NonNullable<Props["variant"]>, string> = {
  ok:      "bg-green-100 text-green-800 border border-green-200",
  error:   "bg-red-100 text-red-700 border border-red-200",
  warning: "bg-amber-100 text-amber-700 border border-amber-200",
  info:    "bg-blue-100 text-blue-700 border border-blue-200",
  neutral: "bg-gray-100 text-gray-600 border border-gray-200",
};

export function Badge({ children, variant = "neutral", size = "sm" }: Props) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${
        size === "xs" ? "px-1.5 py-0.5 text-xs" : "px-2 py-0.5 text-xs"
      } ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
