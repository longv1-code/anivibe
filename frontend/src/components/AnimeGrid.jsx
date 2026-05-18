import AnimeCard from "./AnimeCard"

const AnimeGrid = ({ results }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {results.map((anime) => (
                // uses ... spread operator unpacks every field of the object as individual props, 
                // results args matches exactly with AnimeCard args
                <div key={anime.mal_url} className="h-full">
                    <AnimeCard {...anime} /> 
                </div>
            ))}
        </div>
    )
}

export default AnimeGrid