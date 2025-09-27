import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-4">Benvenuto nella Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}

export default Dashboard
