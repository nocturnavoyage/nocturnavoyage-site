import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/dashboard");
  }, [navigate]);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    const t = toast.loading("Creating your account...");

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(error.message, { id: t });
      setLoading(false);
      return;
    }

    let avatar_url = null;
    if (avatar) {
      const filePath = `${data.user.id}/${avatar.name}`;
      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, avatar);
      if (uploadError) {
        toast.error(uploadError.message, { id: t });
        setLoading(false);
        return;
      }
      avatar_url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;
    }

    const { error: insertError } = await supabase.from("users").insert({
      id: data.user.id,
      email,
      username,
      photo_url: avatar_url,
      created_at: new Date()
    });

    if (insertError) {
      toast.error(insertError.message, { id: t });
      setLoading(false);
      return;
    }

    toast.success("Account created successfully!", { id: t });
    setLoading(false);
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleRegister} className="space-y-4 bg-gray-800 p-8 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold">Register</h1>
        <input className="block w-full p-2 text-black" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input className="block w-full p-2 text-black" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <input className="block w-full p-2 text-black" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
        <input className="block w-full p-2 text-white" type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} />
        <button disabled={loading} className="bg-green-600 px-4 py-2 rounded w-full disabled:opacity-60">{loading ? "Loading..." : "Register"}</button>
      </form>
    </div>
  );
}