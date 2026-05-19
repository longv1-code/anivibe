import AnimeCard from "./AnimeCard"

const AnimeGrid = ({ results, user, favorites, onFavoriteChange }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {results.map((anime) => (
                // uses ... spread operator unpacks every field of the object as individual props, 
                // results args matches exactly with AnimeCard args
                <div key={anime.mal_url} className="h-full">
                    <AnimeCard 
                        {...anime} 
                        user={user}
                        isFavorite={favorites.some(f => f.mal_url === anime.mal_url)}
                        onFavoriteChange={onFavoriteChange}
                    /> 
                </div>
            ))}
        </div>
    )
}

export default AnimeGrid