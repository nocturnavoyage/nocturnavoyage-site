import { useParams } from "react-router-dom";
import BlockChat from "../components/BlockChat";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function WallBlockPage() {
  const { id } = useParams();
  const [block, setBlock] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase
      .from("wall.blocks")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (!error) setBlock(data);
      });
  }, [id]);

  if (!block) return <p className="text-white p-4">Loading block...</p>;

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-2">{block.title}</h2>
      <p className="mb-4 text-gray-300">{block.description}</p>

      <BlockChat blockId={block.id} session={session} />
    </div>
  );
}

export default WallBlockPage;