import Image from "next/image";
import clsx from "clsx";
import { AgentStatus } from "@/lib/data";

const RING: Record<AgentStatus, string> = {
  idle: "ring-slate-200",
  thinking: "ring-amber-400",
  working: "ring-emerald-400",
  done: "ring-blue-400",
};

export function Avatar({
  src,
  alt,
  size = 56,
  status,
  className,
}: {
  src: string;
  alt: string;
  size?: number;
  status?: AgentStatus;
  className?: string;
}) {
  const working = status === "working";
  return (
    <div
      className={clsx(
        "relative rounded-full ring-2 overflow-hidden",
        status ? RING[status] : "ring-slate-200",
        working && "text-emerald-400 pulse-ring",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} width={size} height={size} className="object-cover" />
    </div>
  );
}
