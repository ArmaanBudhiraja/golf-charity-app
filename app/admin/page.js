"use client";

import { supabase } from "@/lib/supabase";

function generateDraw() {
  let numbers = [];
  for (let i = 0; i < 5; i++) {
    numbers.push(Math.floor(Math.random() * 45) + 1);
  }
  return numbers;
}

export default function Admin() {
  const runDraw = async () => {
    const numbers = generateDraw();

    await supabase.from("draws").insert([
      {
        month: new Date().toLocaleString("default", { month: "long" }),
        numbers,
        status: "published",
      },
    ]);

    alert("Draw generated!");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl">Admin Panel</h1>

      <button
        onClick={runDraw}
        className="mt-4 px-6 py-3 bg-black text-white"
      >
        Run Draw
      </button>
    </div>
  );
}