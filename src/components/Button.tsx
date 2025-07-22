import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode; // 👈 can be any renderable React content
};
export default function Button({ children }: ButtonProps) {
  return <button className="clear-field">{children}</button>;
}
