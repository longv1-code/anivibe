import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Auth from './components/Auth'
import FavoritesPage from './pages/FavoritesPage'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/signin" element={<Auth mode="signin" />} />
            <Route path="/signup" element={<Auth mode="signup" />} />
        </Routes>
    )
}

export default App