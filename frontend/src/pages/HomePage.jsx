import SearchBar from '../components/Searchbar'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import AnimeGrid from '../components/AnimeGrid'
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

  const heroRef = useRef(null)

  // subtle parallax on hero background
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const bg = el.querySelector('.hero-bg')
    let raf = null
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5)
      const y = ((e.clientY - rect.top) / rect.height - 0.5)
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (bg) bg.style.transform = `translate(${x * 12}px, ${y * 8}px) scale(1.06)`
      })
    }
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf)
      if (bg) bg.style.transform = 'translate(0px, 0px) scale(1.06)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // SearchBar function shows the search bar feature
  // loading message is only true if isLoading, clever use of &&
  // results only show if there is results (uses length to check rather if object exists) and show grid of anime
  // tip: to render an element with an if-condition, use && operator 
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Navbar */}
      <Navbar user={user} profile={profile}/>

      {/* Hero Search Section */}
      <div className="relative w-full overflow-hidden" style={{ height: '500px' }} ref={heroRef}>
            {/* Layered background: blurred base + vignette overlay for seamless blend */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="hero-bg" style={{ backgroundImage: "url('/hero-bg.png')" }} />
              <div className="hero-overlay" />
            </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto px-8 pt-24 pb-12 text-center">
              <h1 className="font-display text-5xl sm:text-6xl font-bold text-text-primary mb-4 tracking-tight leading-tight">
                  Find your next obsession.
              </h1>
              <p className="text-text-primary text-lg mb-6 max-w-xl mx-auto leading-relaxed">
                  Tell us a mood, a plot twist, or a character type — we'll match you
                  with anime that fit the vibe.
              </p>
              <div className="mx-auto max-w-xl">
                <SearchBar query={searchQuery} setQuery={setSearchQuery} onSearch={handleSearch} />

                {/* Sample prompts */}
                <div className="flex flex-wrap gap-3 justify-center mt-4">
                  {[
                    'Dark psychological thriller with a twist',
                    'Slice of life, heartwarming, school setting',
                    'Sci-fi mecha with tactical battles'
                  ].map((p) => (
                    <button
                      key={p}
                      onClick={() => { setSearchQuery(p); handleSearch(p); }}
                      className="text-sm px-3 py-2 rounded-full bg-glass border border-border-subtle text-text-muted hover:bg-bg-card-hover transition"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
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
