
import { ReactNode } from "react";

interface TypewriterProps {
  children: ReactNode;
}

export default function Typewriter({ children }: TypewriterProps) {
  return <div className="typewriter">
    <p>{children}</p>
    </div>;
}
