import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  if (!user) return null;

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">NocturnaVoyage</div>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Logout</button>
      </div>
    </nav>
  );
}