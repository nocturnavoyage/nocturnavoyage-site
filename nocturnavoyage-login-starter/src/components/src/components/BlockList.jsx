import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function BlockList() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetchBlocks();
  }, []);

  async function fetchBlocks() {
    const { data, error } = await supabase
      .from("wall.public_blocks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error loading blocks:", error);
    else setBlocks(data);
  }

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">🧱 Public Wall Blocks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blocks.map((block) => (
          <Link
            key={block.id}
            to={`/block/${block.id}`}
            className="block bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition"
          >
            <h3 className="text-lg font-bold">{block.title}</h3>
            <p className="text-sm text-gray-300 line-clamp-3">{block.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}