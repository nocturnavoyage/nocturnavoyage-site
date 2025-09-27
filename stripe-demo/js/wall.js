// ✅ Collegamento a Supabase con le tue chiavi
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  'https://xwrzskanyxhyudenjgam.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3cnpza2FueHlodWRlbmpnY2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MTQxNTUsImV4cCI6MjA2OTk5MDE1NX0.dR9fi1nrHhsGTncAgnEKCQS1Iak2YIyJKLst7CsY3U4'
)

const container = document.getElementById('wall')
const urlParams = new URLSearchParams(window.location.search)
const page = parseInt(urlParams.get('page')) || 1

// 🎨 Colori dinamici per ogni stato
function getColor(status) {
  switch (status) {
    case 'active': return '#00ff88'     // Verde: abbonato
    case 'trial': return '#facc15'      // Giallo: in prova
    case 'grayed': return '#aaa'        // Grigio: pagamento in sospeso
    case 'hidden': return '#111'        // Quasi nero: invisibile temporaneamente
    case 'available': return '#facc15'  // Giallo chiaro: blocco libero
    default: return '#333'              // Default fallback
  }
}

// 🔁 Carica 500 blocchi dalla pagina corrente
async function loadWallPage() {
  const { data, error } = await supabase.rpc('get_wall_page', { page })

  if (error) {
    console.error('Errore nel caricamento blocchi:', error)
    container.innerHTML = '<p style="color:red;text-align:center;">Errore nel caricamento.</p>'
    return
  }

  container.innerHTML = ''

  data.forEach(block => {
    const div = document.createElement('div')
    div.className = 'block'
    div.style.backgroundColor = getColor(block.status)
    div.textContent = block.position
    div.title = `${block.title || 'Untitled'} – Status: ${block.status}`

    div.onclick = () => {
      if (block.status === 'available') {
        window.location.href = `buy.html?block=${block.position}`
      } else {
        window.location.href = `block.html?id=${block.id}`
      }
    }

    container.appendChild(div)
  })
}

loadWallPage()
