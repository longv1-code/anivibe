import SearchBar from '../components/Searchbar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AnimeGrid from '../components/AnimeGrid'
import { Button } from '@mui/material'
import { getFavorites } from '../services/favorites'
import { getProfile } from '../services/profile'
import Navbar from '../components/Navbar'
import FilterChips from '../components/FilterChips'

const HomePage = ( { user } ) => {
  // states for re-rendering
  const [searchQuery, setSearchQuery] = useState("") // state to save query
  const [results, setResults] = useState([]) // state to save results
  const [isLoading, setIsLoading] = useState(false) // state to load if waiting for results
  const [filters, setFilters] = useState({}) // state to save Gemini filters
  const [favorites, setFavorites] = useState([])
  const [profile, setProfile] = useState(null)
  
  const handleSearch = async (query) => {
    try {
      setIsLoading(true)
      setFilters({})
      console.log("user searched for:", query)
      setSearchQuery(query)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/anime/search`, { // call POST request on /anime/search to run function search_anime in anime.py
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

  const runFilterSearch = async ( newFilters ) => { // function for Apply Filters button
    try {
      setIsLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/anime/filter`, { // call POST request on /anime/filter to run function filter_anime in anime.py
          filters: {
              ...newFilters
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

  const handleChipRemove = async (key, value) => {
    let newFilters
    if (key === "genres") {
        newFilters = {...filters, genres: filters.genres.filter(g => g !== value)}
    } else if (key === "order_by") {
        newFilters = {...filters, order_by: "popularity", sort: "asc"}
    } else {
        newFilters = {...filters, [key]: null}
    }
    setFilters(newFilters)
    await runFilterSearch(newFilters) // pass new filters directly
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
      <div className="relative w-full overflow-hidden" style={{ height: '500px' }}>
          {/* Background collage */}
          <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/hero-bg.png')" }}
          />
          
          {/* Dark gradient overlay */}
          <div className="absolute inset-0" style={{ background: 'rgba(13, 17, 23, 0.75)' }} />
          
          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto px-8 pt-24 pb-12 text-center">
              <h1 className="font-display text-6xl font-bold text-text-primary mb-6 tracking-tight leading-tight">
                  Discover anime made<br/>
                  <span className="text-accent-blue">for you.</span>
              </h1>
              <p className="text-text-primary text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  Describe a vibe, a mood, a plot — and we'll find exactly 
                  what you're looking for from thousands of titles.
              </p>
              <SearchBar query={searchQuery} setQuery={setSearchQuery} onSearch={handleSearch} />
          </div>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto px-8 py-4">
        {Object.keys(filters).length > 0 && (
                <FilterChips 
                    filters={filters} 
                    onRemove={handleChipRemove}
                />
        )}
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
