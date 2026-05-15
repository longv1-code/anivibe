import SearchBar from './components/Searchbar'
import axios from 'axios'
import { useState } from 'react'
import AnimeGrid from './components/AnimeGrid'
import FilterPanel from './components/FilterPanel'
import { Button } from '@mui/material'

const App = () => {
  // states for re-rendering
  const [searchQuery, setSearchQuery] = useState("") // state to save query
  const [results, setResults] = useState([]) // state to save results
  const [isLoading, setIsLoading] = useState(false) // state to load if waiting for results
  const [filters, setFilters] = useState({}) // state to save Gemini filters
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = async (query) => {
    try {
      setIsLoading(true)
      console.log("user searched for:", query)
      setSearchQuery(query)
      const response = await axios.post("http://localhost:8000/anime/search", { // call POST request on /anime/search to run function search_anime in anime.py
        prompt: query
      })
      setResults(response.data.results) // response is axios object, .data has the array of anime
      setFilters(response.data.params)
      setIsLoading(false)
    } catch (e) { // catch error e and display err msg
      console.log("Search failed:", e)
      setIsLoading(false)
    }

  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({...prev, [key]: value})) // prev contain original state before change, something React does internally with an arrow function inside setter function
  }

  const handleApplyFilters = async () => { // function for Apply Filters button
    try {
      setIsLoading(true)
      const response = await axios.post("http://localhost:8000/anime/filter", {
        filters: {...filters, query: searchQuery }
      })
      setResults(response.data.results)
      setFilters(response.data.params)
      setIsLoading(false)
    } catch (e) {
      console.log("Filter failed:", e)
      setIsLoading(false)
    }
  }

  // SearchBar function shows the search bar feature
  // loading message is only true if isLoading, clever use of &&
  // results only show if there is results (uses length to check rather if object exists) and show grid of anime
  // tip: to render an element with an if-condition, use && operator 
  return (
    <div>
      <SearchBar 
        onSearch={handleSearch} 
        query={searchQuery}
        setQuery={setSearchQuery}  
      /> 
      
      <Button onClick={() => setShowFilters(prev => !prev)}>
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>
      {showFilters && 
        <FilterPanel 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onApplyFilters={handleApplyFilters}
        />
      }

      {isLoading && <p>Loading...</p>} 
      {results.length > 0 && (<AnimeGrid results={results} />)}
    </div>
  )
}

export default App
