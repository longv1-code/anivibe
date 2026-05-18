import styles from './AnimeCard.module.css'

const AnimeCard = ({ title, score, mal_url, type, episodes, status, genres, image, synopsis, studios }) => {
    return (
        <a href={mal_url} target="_blank" rel="noreferrer" className={styles.card}>
            {/* Image with title overlay */}
            <div className={styles.imageWrapper}>
                <img src={image} alt={title} className={styles.image} />
                <div className={styles.imageOverlay}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.studio}>
                        {studios?.length > 0 ? studios.join(", ") : "Unknown Studio"}
                    </p>
                </div>
            </div>

            {/* Content below image */}
            <div className={styles.content}>
                {/* Rating */}
                <div className={styles.rating}>
                    ★ {score}
                    <span className={styles.ratingLabel}>score</span>
                </div>

                {/* Type, Episodes, Status */}
                <div className={styles.meta}>
                    {type && <span className={styles.metaTag}>{type}</span>}
                    {episodes 
                        ? <span className={styles.metaTag}>{episodes} eps</span>
                        : <span className={styles.metaTag}>? eps</span>
                    }
                    {status && <span className={styles.metaTag}>{status}</span>}
                </div>

                {/* Synopsis */}
                <p className={styles.synopsis}>{synopsis}</p>

                {/* Genres */}
                <div className={styles.genres}>
                    {genres.slice(0, 3).map((genre) => ( // used map() to apply span on each genre array element
                        <span key={genre} className={styles.genre}>{genre}</span> // span to show inline side by side text
                    ))}
                </div>
            </div>
        </a>
    )
}

export default AnimeCard