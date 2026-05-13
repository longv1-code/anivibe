import SearchBar from './components/Searchbar'
import axios from 'axios'
import { useState } from 'react'
import AnimeGrid from './components/AnimeGrid'

const App = () => {
  // states for re-rendering
  const [searchQuery, setSearchQuery] = useState("") // state to save query
  const [results, setResults] = useState([]) // state to save results
  const [isLoading, setIsLoading] = useState(false) // state to load if waiting for results
  const [filters, setFilters] = useState({}) // state to save Gemini filters

  const handleSearch = async (query) => {
    try {
      setIsLoading(true)
      console.log("user searched for:", query)
      const response = await axios.post("http://localhost:8000/anime/search", { // call POST request on /anime/search to run function search_anime in anime.py
        prompt: query
      })
      setResults(response.data) // response is axios object, .data has the array of anime
      setIsLoading(false)
    } catch (e) { // catch error e and display err msg
      console.log("Search failed: ", e)
      setIsLoading(false)
    }

  }
  // SearchBar function shows the search bar feature
  // loading message is only true if isLoading, clever use of &&
  // results only show if there is results (uses length to check rather if object exists) and show grid of anime
  // tip: to render an element with an if-condition, use && operator 
  return (
    <div>
      <SearchBar onSearch={handleSearch} /> 
      {isLoading && <p>Loading...</p>} 
      {results.length > 0 && <AnimeGrid results={results} />}
    </div>
  )
}

export default App
