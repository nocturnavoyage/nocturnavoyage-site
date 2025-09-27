import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import BlockChatRealtime from "../components/BlockChatRealtime";
import ImageUploader from "../components/ImageUploader";

export default function WallBlockPageExample({ session }) {
  const { id } = useParams();
  const [block, setBlock] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchBlock();
  }, [id]);

  async function fetchBlock() {
    const { data, error } = await supabase
      .from("wall.blocks")
      .select("*")
      .eq("id", id)
      .single();
    if (!error) setBlock(data);
  }

  if (!block) return <div className="text-white p-4">Loading block...</div>;

  return (
    <div className="text-white p-4 space-y-6">
      <h1 className="text-3xl font-bold">{block.title}</h1>
      <p className="text-gray-300">{block.description}</p>

      {imageUrl && (
        <div>
          <h3 className="font-bold text-lg mt-4">Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" className="max-w-xs mt-2 rounded" />
        </div>
      )}

      <ImageUploader onUpload={(url) => setImageUrl(url)} />

      <BlockChatRealtime blockId={block.id} session={session} />
    </div>
  );
}