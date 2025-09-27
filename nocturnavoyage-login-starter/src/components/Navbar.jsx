import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold flex items-center gap-2">
        <img src="/assets/logo.svg" alt="Logo" className="h-6" />
        NocturnaVoyage
      </Link>
      <div className="space-x-4">
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/signup" className="hover:underline">Registrati</Link>
        <Link to="/completa-profilo" className="hover:underline">Profilo</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      </div>
    </nav>
  )
}

export default Navbar
