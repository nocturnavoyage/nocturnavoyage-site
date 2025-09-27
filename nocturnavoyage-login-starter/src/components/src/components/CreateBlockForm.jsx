import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function CreateBlockForm({ userId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("wall.blocks").insert({
      user_id: userId,
      title,
      description,
      tier: "SUBSCRIPTION",
      is_public: true,
      is_active: true,
    });
    if (error) alert("Error: " + error.message);
    else alert("Block created successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 p-4 rounded-lg text-white space-y-3">
      <h2 className="text-xl font-bold">Create New Block</h2>
      <input
        type="text"
        placeholder="Block Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded bg-zinc-700"
        required
      />
      <textarea
        placeholder="Block Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 rounded bg-zinc-700"
        rows={4}
        required
      />
      <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">Create</button>
    </form>
  );
}