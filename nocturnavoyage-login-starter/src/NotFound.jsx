import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page not found</p>
      <Link to="/" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Go Home</Link>
    </div>
  );
}