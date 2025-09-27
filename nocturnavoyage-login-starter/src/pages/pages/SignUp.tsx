// SignUp.tsx completo aggiornato

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [role, setRole] = useState('user');
  const [allowComments, setAllowComments] = useState(false);
  const [category, setCategory] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    let finalRole = role;
    if (email === 'admin@nocturnavoyage.com') {
      finalRole = 'admin';
    }

    const { error: insertError } = await supabase.from('profiles').insert([
      {
        id: data.user?.id,
        username,
        photo_url: photoUrl,
        role: finalRole,
        allow_comments: allowComments,
        category: finalRole === 'local' ? category : null,
        created_at: new Date()
      }
    ]);

    if (insertError) {
      alert(insertError.message);
      return;
    }

    navigate('/');
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>Registrati</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="URL immagine profilo (opzionale)"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />

      <div style={{ marginTop: '1rem' }}>
        <label>
          <input
            type="radio"
            name="role"
            value="user"
            checked={role === 'user'}
            onChange={() => {
              setRole('user');
              setAllowComments(false);
              setCategory('');
            }}
          />
          Utente normale
        </label>

        <label style={{ marginLeft: '20px' }}>
          <input
            type="radio"
            name="role"
            value="local"
            checked={role === 'local'}
            onChange={() => setRole('local')}
          />
          Locale notturno
        </label>
      </div>

      {role === 'local' && (
        <>
          <div style={{ marginTop: '1rem' }}>
            <label>
              <input
                type="checkbox"
                checked={allowComments}
                onChange={() => setAllowComments(!allowComments)}
              />
              Attiva i commenti nei tuoi post
            </label>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label>Scegli la tua categoria:</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- Seleziona una categoria --</option>
              <option value="Night Club">Night Club</option>
              <option value="Lap Dance">Lap Dance</option>
              <option value="Strip Club">Strip Club</option>
              <option value="Erotic Lounge">Erotic Lounge</option>
              <option value="Sexy Disco">Sexy Disco</option>
              <option value="Hotel a tema">Hotel a tema</option>
              <option value="Love Hotel">Love Hotel</option>
              <option value="Sexy Shop">Sexy Shop</option>
              <option value="Sauna">Sauna</option>
              <option value="Bagno Turco">Bagno Turco</option>
              <option value="Centro Massaggi">Centro Massaggi</option>
              <option value="BDSM Dungeon">BDSM Dungeon</option>
              <option value="Burlesque">Burlesque</option>
              <option value="Pole Dance">Pole Dance</option>
              <option value="Cabaret">Cabaret</option>
              <option value="Performer locali">Performer locali</option>
              <option value="Escort (dove legale)">Escort (dove legale)</option>
              <option value="Fetish Club">Fetish Club</option>
              <option value="Cruising Bar">Cruising Bar</option>
              <option value="Casinò">Casinò</option>
              <option value="Private Club">Private Club</option>
              <option value="Swinger Club">Swinger Club</option>
              <option value="Party Privati">Party Privati</option>
              <option value="Cam Girl Studio">Cam Girl Studio</option>
              <option value="VideoChat Room">VideoChat Room</option>
              <option value="Adult Theater">Adult Theater</option>
              <option value="Gay Bar">Gay Bar</option>
              <option value="Dark Room">Dark Room</option>
              <option value="Drag Show">Drag Show</option>
              <option value="Trans Club">Trans Club</option>
              <option value="Spogliarellisti">Spogliarellisti</option>
              <option value="Spogliarelliste">Spogliarelliste</option>
              <option value="Eventi sexy">Eventi sexy</option>
              <option value="Cosplay erotico">Cosplay erotico</option>
              <option value="Rave party">Rave party</option>
              <option value="Glory Hole">Glory Hole</option>
              <option value="Nudist Club">Nudist Club</option>
              <option value="Body Painting">Body Painting</option>
              <option value="Pet Play">Pet Play</option>
              <option value="Shibari Show">Shibari Show</option>
              <option value="Karaoke Sexy">Karaoke Sexy</option>
              <option value="After Party">After Party</option>
              <option value="Room Service">Room Service</option>
              <option value="Vip Room">Vip Room</option>
              <option value="Luxury Club">Luxury Club</option>
              <option value="XXX Gallery">XXX Gallery</option>
              <option value="Tattoo Sexy">Tattoo Sexy</option>
              <option value="Nipple Bar">Nipple Bar</option>
              <option value="Show a tema">Show a tema</option>
              <option value="Erotic Museum">Erotic Museum</option>
              <option value="MSP">MSP</option>
            </select>
          </div>
        </>
      )}

      <button type="submit" style={{ marginTop: '1rem' }}>
        Registrati
      </button>
    </form>
  );
}
