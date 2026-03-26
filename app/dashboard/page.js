"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ScoreForm from "@/components/ScoreForm";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      const { data: scoresData } = await supabase
        .from("scores")
        .select("*")
        .eq("user_id", data.user.id)
        .order("date", { ascending: false });

      setScores(scoresData);
    };

    getUser();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl">Dashboard</h1>

      {user && <ScoreForm user={user} />}

      <h2 className="mt-6">Your Scores</h2>
      <ul>
        {scores.map((s) => (
          <li key={s.id}>
            {s.score} - {new Date(s.date).toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}