import AnimeCard from "./AnimeCard"

const AnimeGrid = ( {results} ) => {
  return (
    <div>
      {results.map((anime) => (
        <AnimeCard key={anime.mal_url} {...anime} /> // uses ... spread operator unpacks every field of the object as individual props, results args matches exactly with AnimeCard args
      ))}
    </div>
  )
}

export default AnimeGrid
