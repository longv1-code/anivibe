const AnimeCard = ( {title, score, mal_url, type, episodes, status, genres, image, synopsis, studios}) => {
  return (
    <div>
      <div>
        <a href={mal_url}>
            <img src={image} />
            {title}
            {studios.map((studio) => ( // used map() to apply span on each studio array element
                <span key={studio}>{studio}</span> // span to show inline side by side text
            ))}
        </a>
      </div>
      <div>
        <div>
            {type}
            {episodes}
            {score}
            {status}
        </div>
        <div>
            {synopsis}
        </div>
        <div>
            {genres.map((genre) => ( // used map() to apply span on each genre array element
                <span key={genre}>{genre}</span> // span to show inline side by side text
            ))}
        </div>
      </div>
    </div>
  )
}

export default AnimeCard
