import { useState, useEffect } from 'react'
import './App.css'
import { api, getCloudFrontUrl } from './api'

function App() {
  const [memes, setMemes] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setLoading(true)
        const response = await api.get('')
        setMemes(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching memes:', err)
        setError(err.message)
        if (err.response?.status === 500) {
          console.error('Server error details:', err.response.data)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMemes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-gray-800 text-white">
        <h1 className="font-bold text-4xl">Dev Memes Database</h1>
      </header>
      
        <main className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Meme Gallery</h2>
          
          {loading && (
            <div className="text-center py-4">
              <p>Loading memes...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {!loading && !error && memes.map((meme) => (
              <div key={meme.id} className="p-4 border rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{meme.title}</h3>
                <img 
                  src={getCloudFrontUrl(meme.key)} 
                  alt={meme.title}
                  className="w-full h-auto rounded-md"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <footer>&copy; Codex Academy March 2025 </footer>
        </main>
      </div>
    )
}

export default App
