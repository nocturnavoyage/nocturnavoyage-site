import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";
import toast from "react-hot-toast";

export default function ProtectedDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    toast.success("Signed out");
    navigate("/login");
  }

  async function deleteAccount() {
    if (!confirm("Are you sure you want to delete your account? This action is irreversible. No refunds will be issued.")) return;

    const { data: sess } = await supabase.auth.getSession();
    const userId = sess?.session?.user?.id;
    if (!userId) return toast.error("Not authenticated");

    const { error: delRowErr } = await supabase.from("users").delete().eq("id", userId);
    if (delRowErr) return toast.error(delRowErr.message);

    localStorage.removeItem("user");
    toast.success("Account deleted. No refunds will be issued.");
    navigate("/register");
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white space-y-4">
      <h1 className="text-3xl">Hello, {user.username}!</h1>
      <p>Email: {user.email}</p>
      {user.photo_url && <img src={user.photo_url} alt="avatar" className="w-24 h-24 rounded-full" />}
      <div className="flex gap-3 mt-4">
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        <button onClick={deleteAccount} className="bg-gray-700 px-4 py-2 rounded">Delete Account</button>
      </div>
    </div>
  );
}