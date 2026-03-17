import { useState, type ReactNode } from "react";

interface Props {
  content: ReactNode;
  children: ReactNode;
}

export function Tooltip({ content, children }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50
          bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg pointer-events-none">
          {content}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4
            border-transparent border-t-gray-800" />
        </span>
      )}
    </span>
  );
}
