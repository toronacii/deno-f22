interface Props {
  className?: string;
}

export function Logo({ className = "h-8 w-auto" }: Props) {
  return (
    <img
      src="/logo-oc.png"
      alt="OC Global Services"
      className={className}
    />
  );
}
