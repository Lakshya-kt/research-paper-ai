import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  id?: string;
}

export default function Section({
  title,
  children,
  id,
}: Props) {
  return (
    <section
      id={id}
      className="max-w-7xl mx-auto px-6 py-12"
    >
      <h2 className="text-3xl font-bold mb-8">
        {title}
      </h2>

      {children}
    </section>
  );
}