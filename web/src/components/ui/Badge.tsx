interface Props {
  children: React.ReactNode;
  variant?: "ok" | "error" | "warning" | "info" | "neutral";
  size?: "sm" | "xs";
}

const styles: Record<NonNullable<Props["variant"]>, string> = {
  ok:      "bg-success-500/15 text-success-600 border border-success-500/25",
  error:   "bg-danger-500/15 text-danger-600 border border-danger-500/25",
  warning: "bg-gold-100 text-gold-700 border border-gold-200",
  info:    "bg-brand-100 text-brand-700 border border-brand-200",
  neutral: "bg-stone-100 text-stone-600 border border-stone-200",
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
