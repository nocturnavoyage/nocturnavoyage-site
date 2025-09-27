import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else navigate("/login");
  };

  return (
    <div className="p-4 max-w-md mx-auto text-white">
      <h2 className="text-xl mb-4 font-bold">Create Account</h2>
      <form onSubmit={handleSignup} className="space-y-3">
        <input
          className="w-full p-2 rounded bg-zinc-800"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 rounded bg-zinc-800"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-green-600 py-2 rounded hover:bg-green-700">Sign Up</button>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
}

export default Signup;