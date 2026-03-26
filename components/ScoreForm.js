"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function ScoreForm({ user }) {
  const [score, setScore] = useState("");

  const addScore = async () => {
    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (data.length >= 5) {
      const oldest = data[data.length - 1];
      await supabase.from("scores").delete().eq("id", oldest.id);
    }

    await supabase.from("scores").insert([
      {
        user_id: user.id,
        score: parseInt(score),
        date: new Date(),
      },
    ]);

    alert("Score added!");
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter score"
        onChange={(e) => setScore(e.target.value)}
        className="border p-2"
      />

      <button onClick={addScore} className="ml-2 px-4 py-2 bg-black text-white">
        Add
      </button>
    </div>
  );
}