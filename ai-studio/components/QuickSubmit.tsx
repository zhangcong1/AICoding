"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useStudio } from "@/lib/store";

export function QuickSubmit() {
  const { submitTask } = useStudio();
  const [text, setText] = useState("");
  const submit = () => {
    if (!text.trim()) return;
    submitTask(text);
    setText("");
  };
  return (
    <div className="hidden md:flex items-center bg-white rounded-lg shadow-card overflow-hidden">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="提交一句话需求，团队自动协作…"
        className="w-64 px-3 py-2 text-sm outline-none"
      />
      <button onClick={submit}
        className="px-3 py-2 bg-ink text-white hover:bg-slate-700 transition-colors">
        <Send size={15} />
      </button>
    </div>
  );
}
