import SearchBar from '../components/Searchbar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AnimeGrid from '../components/AnimeGrid'
import FilterPanel from '../components/FilterPanel'
import { Button } from '@mui/material'
import { getFavorites } from '../services/favorites'
import { getProfile } from '../services/profile'
import Navbar from '../components/Navbar'

const HomePage = ( { user } ) => {
  // states for re-rendering
  const [searchQuery, setSearchQuery] = useState("") // state to save query
  const [results, setResults] = useState([]) // state to save results
  const [isLoading, setIsLoading] = useState(false) // state to load if waiting for results
  const [filters, setFilters] = useState({}) // state to save Gemini filters
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [profile, setProfile] = useState(null)
  
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
          filters: {
              ...filters
          }
      })
      setResults(response.data.results)
      setFilters(response.data.params)
      setIsLoading(false)
    } catch (e) {
      console.log("Filter failed:", e)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      getFavorites(user.id).then(data => setFavorites(data || []))
      getProfile(user.id).then(data => setProfile(data))
    } else {
      setFavorites([])
      setProfile(null)
    }
  }, [user])

  // SearchBar function shows the search bar feature
  // loading message is only true if isLoading, clever use of &&
  // results only show if there is results (uses length to check rather if object exists) and show grid of anime
  // tip: to render an element with an if-condition, use && operator 
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Navbar */}
      <Navbar user={user} profile={profile}/>

      {/* Hero Search Section */}
      <div className="relative max-w-3xl mx-auto px-8 pt-24 pb-12 text-center">
          {/* background glow */}
          <div className="absolute inset-0 bg-accent-blue opacity-5 blur-3xl rounded-full pointer-events-none" />
          
          <h1 className="font-display text-6xl font-bold text-text-primary mb-6 tracking-tight leading-tight">
              Discover anime made<br/>
              <span className="text-accent-blue">for you.</span>
          </h1>
          
          <p className="text-text-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Describe a vibe, a mood, a plot — and we'll find exactly 
              what you're looking for from thousands of titles.
          </p>

          <SearchBar query={searchQuery} setQuery={setSearchQuery} onSearch={handleSearch} />
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto px-8 mb-8 flex flex-col items-center gap-4">
        <Button
            onClick={() => setShowFilters(prev => !prev)}
            className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm border border-border-subtle rounded-full px-4 py-2"
        >
            ⚙ {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>

        {showFilters &&
            <div className="w-full bg-bg-card border border-border-subtle rounded-2xl p-6">
                <FilterPanel
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onApplyFilters={handleApplyFilters}
                />
            </div>
        }
    </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-8 pb-16">
        {isLoading && <p className="text-text-muted text-center py-16">Searching...</p>}
        {!isLoading && results.length > 0 && <AnimeGrid results={results} user={user} favorites={favorites} />}
      </div>
    </div>
  )
}

export default HomePage
