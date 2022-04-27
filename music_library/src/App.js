import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './Components/Gallery'
import SearchBar from './Components/SearchBar'
import AlbumView from './Components/AlbumView'
import ArtistView from './Components/ArtistView'

function App(){
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])

    const API_URL = 'https://itunes.apple.com/search?term='

    useEffect(() => {
      if(search) {
        const fetchData = async () => {
          document.title = `${search} Music`
          const response = await fetch(API_URL + search)
          const resData = await response.json()
          if (resData.results.length > 0) {
            setData(resData.results)
          }
          else {
            setMessage('Not Found')
          }
        }
        fetchData()
      }        
    }, [search])

    const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
    }

    return (
      <div>
      {message}
          <Router>
              <Routes>
                  <Route path="/" element={
                      <>
                          <SearchBar handleSearch = {handleSearch}/>
                          <Gallery data={data} />
                      </>
                  } />
                  <Route path="/album/:id" element={<AlbumView />} />
                  <Route path="/artist/:id" element={<ArtistView />} />
              </Routes>
          </Router>
      </div>
    )
  
}

export default App
