import { Button } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import supabase from '../supabase'

const Navbar = ( {user, profile, minimal = false} ) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }
  const navigate = useNavigate()
  return (
    <nav className="border-b border-border-subtle px-8 py-4 flex justify-between items-center">
        <h1 className="font-display text-2xl font-bold text-accent-blue tracking-tight cursor-pointer" onClick={() => window.location.href = '/'}>
          ANIVIBE
        </h1>
        {!minimal && (
            user ? (
                <div className="flex items-center gap-4">
                    <span className="text-text-muted text-sm">
                    {profile?.username || user.email}
                    </span>
                    <Button onClick={() => navigate('/favorites')} variant="outlined" size="small">
                    Favorites
                    </Button>
                    <Button onClick={handleSignOut} size="small">
                    Sign Out
                    </Button>
                </div>
            ) : (
                <Button onClick={() => navigate('/signin')}>Sign In</Button>
            )
          )}
      </nav>
  )
}

export default Navbar
