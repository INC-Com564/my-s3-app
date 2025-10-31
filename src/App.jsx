import { useState, useEffect } from 'react'
import './App.css'
import { api } from './api'

function App() {
  const [memes, setMemes] = useState([])
  useEffect(() => {
  api.get('/user?ID=12345')
  .then(function(response) {

    console.log(response);
    setMemes(response.data);
  })
  .catch(function (error){

     console.log(error);
  }
  )}, [])

  return (
    <>
      <header>
      <h1 className="font-bold font text-4xl">Dev Memes Database</h1>
      </header>
      <main className="min-h-[100vw]"></main>
      <h2>Meme Gallery</h2>
      <div>
        {memes.map((meme) => {
          return <>
          <div>
            <h3>{meme.title}</h3>
            <img src={meme.url} alt={meme.title}/>
          </div>
          </>
        }
      )}
      </div>
      <footer>&copy; Codex Academy March 2025 </footer>
    </>
  )
}

export default App
