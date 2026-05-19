import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AnimeGrid from '../components/AnimeGrid'
import { getFavorites, addFavorite } from '../services/favorites'
import Navbar from '../components/Navbar'
import { getProfile } from '../services/profile'
import { Button, Snackbar } from '@mui/material'

const FavoritesPage = ( { user } ) => {
  const navigate = useNavigate()

  const [favorites, setFavorites] = useState([])
  const [profile, setProfile] = useState(null)
  const [undoAnime, setUndoAnime] = useState(null) // stores removed anime temporarily
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  useEffect(() => {
      if (user) {
        getFavorites(user.id).then(data => setFavorites(data || []))
        getProfile(user.id).then(data => setProfile(data))
      } else {
        setFavorites([])
        setProfile(null)
        navigate('/')
      }
    }, [user])

  const handleFavoriteChange = (malUrl, isFavorited) => {
    if (!isFavorited) {
      const removed = favorites.find(f => f.mal_url === malUrl)
      setUndoAnime(removed) // save it in case user wants to undo
      setFavorites(prev => prev.filter(f => f.mal_url !== malUrl))
      setSnackbarOpen(true)
    }
  }

  const handleUndo = async () => {
    if (undoAnime) {
      await addFavorite(user.id, undoAnime)
      setFavorites(prev => [...prev, undoAnime])
      setUndoAnime(null)
      setSnackbarOpen(false)
    }
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return // don't close if user clicks elsewhere
    setSnackbarOpen(false)
    setUndoAnime(null) // discard the removed anime permanently
  }

  return (
    <div className="min-h-screen bg-bg-primary">
        <Navbar user={user} profile={profile} />
        
        <div className="max-w-7xl mx-auto px-8 py-12">
            <h1 className="font-display text-3xl font-bold text-text-primary mb-8">
                My Favorites
            </h1>
            
            {favorites.length > 0 ? (
                <AnimeGrid 
                    results={favorites} 
                    user={user} 
                    favorites={favorites}
                    onFavoriteChange={handleFavoriteChange}
                />
            ) : (
                <div className="text-center py-24">
                    <p className="text-6xl mb-4">🤍</p>
                    <p className="font-display text-xl text-text-primary mb-2">
                        No favorites yet
                    </p>
                    <p className="text-text-muted mb-6">
                        Search for anime and save ones you want to watch later
                    </p>
                    <Button 
                        variant="contained" 
                        onClick={() => navigate('/')}
                    >
                        Find Anime
                    </Button>
                </div>
            )}
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          message="Removed from favorites"
          action={
              <Button 
                  color="warning" 
                  size="small" 
                  onClick={handleUndo}
              >
                  UNDO
              </Button>
          }
        />
    </div>
  )
}

export default FavoritesPage
