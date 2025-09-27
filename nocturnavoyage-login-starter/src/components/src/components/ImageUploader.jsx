import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ImageUploader({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from("images").upload(fileName, file);

    if (error) {
      alert("Upload error: " + error.message);
    } else {
      const { data: publicUrl } = supabase.storage.from("images").getPublicUrl(fileName);
      onUpload(publicUrl.publicUrl);
    }
    setUploading(false);
  };

  return (
    <div className="my-2">
      <input type="file" onChange={handleUpload} disabled={uploading} />
      {uploading && <p className="text-sm text-gray-400">Uploading...</p>}
    </div>
  );
}