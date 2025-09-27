import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function CompleteProfile() {
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const user = data?.user
      if (user) {
        supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
          if (data) {
            setUsername(data.username || '')
            setAvatarUrl(data.photo_url || '')
          }
        })
      }
    })
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return alert("Utente non trovato")

    const { error } = await supabase.from('profiles').update({
      username,
      photo_url: avatarUrl
    }).eq('id', user.id)

    if (error) alert('Errore nel salvataggio: ' + error.message)
    else navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Completa il tuo profilo</h1>
      <form onSubmit={handleSave} className="flex flex-col gap-4 w-full max-w-sm">
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="px-4 py-2 rounded bg-gray-800" required />
        <input type="text" placeholder="URL Immagine Profilo" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} className="px-4 py-2 rounded bg-gray-800" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-bold">
          Salva Profilo
        </button>
      </form>
    </div>
  )
}

export default CompleteProfile
