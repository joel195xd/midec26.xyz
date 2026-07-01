import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full max-w-7xl mx-auto px-6 py-24 ${className}`}
    >
      {children}
    </section>
  );
}
