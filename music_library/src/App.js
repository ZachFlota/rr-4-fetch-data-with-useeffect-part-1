import { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './Components/Gallery'
import SearchBar from './Components/SearchBar'
import AlbumView from './Components/AlbumView'
import ArtistView from './Components/ArtistView'
import { DataContext } from './Context/DataContext'
import { SearchContext } from './Context/SearchContext'

function App(){
    
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])
    let searchInput = useRef('')

    const API_URL = 'https://itunes.apple.com/search?term='

    const handleSearch = (e, term) => {
      e.preventDefault()
      const fetchData = async () => {
        document.title = `${term} Music`
        const response = await fetch(API_URL + term)
        const resData = await response.json()
        if (resData.results.length > 0) {
          return setData(resData.results)
        }
        else {
          return setMessage('Not Found')
        }
      }
      fetchData()
    }


    return (
      <div className="App">
      {message}
          <Router>
              <Routes>
                  <Route path="/" element={
                      <>
                        <SearchContext.Provider value={{
                          term: searchInput,
                          handleSearch: handleSearch
                          }}>
                          <SearchBar />
                        </SearchContext.Provider>
                        <DataContext.Provider value={data} >
                          <Gallery />
                        </DataContext.Provider>
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
