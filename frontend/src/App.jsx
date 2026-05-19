import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Auth from './components/Auth'
import FavoritesPage from './pages/FavoritesPage'
import ProtectedRoute from './components/ProtectedRoute'
import { useState, useEffect } from 'react'
import supabase from './supabase'

const App = () => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            setAuthLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (authLoading) return null // don't render anything until auth is ready

    return (
        <Routes>
            <Route path="/" element={<HomePage user={user}/>} />
            <Route 
                path="/favorites" 
                element={
                    <ProtectedRoute user={user}>
                        <FavoritesPage user={user} />
                    </ProtectedRoute>
                } 
            />
            <Route path="/signin" element={<Auth mode="signin" />} />
            <Route path="/signup" element={<Auth mode="signup" />} />
        </Routes>
    )
}

export default App