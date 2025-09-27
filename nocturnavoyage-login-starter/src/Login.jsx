import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/dashboard");
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    const t = toast.loading("Signing you in...");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message, { id: t });
      setLoading(false);
      return;
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (userError) {
      toast.error(userError.message, { id: t });
      setLoading(false);
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));
    toast.success(`Welcome back ${userData.username}!`, { id: t });
    setLoading(false);
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="space-y-4 bg-gray-800 p-8 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold">Login</h1>
        <input className="block w-full p-2 text-black" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input className="block w-full p-2 text-black" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button disabled={loading} className="bg-blue-600 px-4 py-2 rounded w-full disabled:opacity-60">{loading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
}