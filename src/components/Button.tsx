import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode; // 👈 can be any renderable React content
  onClick: () => void;
};
export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="clear-field" onClick={onClick}>
      {children}
    </button>
  );
}
