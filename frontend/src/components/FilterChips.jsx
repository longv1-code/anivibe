const FilterChips = ( {filters, onRemove} ) => {
  const LABEL_MAP = {
    "title": "Title",
    "start_date": "Start Date",
    "end_date": "End Date",
    "episodes": "Episodes",
    "score": "Score",
    "rank": "Rank",
    "popularity": "Popularity",
    "members": "Members",
    "favorites": "Favorites",

    "tv": "TV",
    "movie": "Movie",
    "ova": "OVA",
    "special": "Special",
    "ona": "ONA",
    "music": "Music",

    "airing": "Airing",
    "complete": "Completed",
    "upcoming": "Upcoming",

    "asc": "↑",
    "desc": "↓",
    
  }

  return (
    <div className="flex flex-wrap gap-2">
        {filters.genres && filters.genres.length > 0 && (
            filters.genres.map((genre) => (
                <span key={genre} className="flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-sm px-4 py-1.5 rounded-full">
                    {genre}
                    <button 
                        onClick={() => onRemove("genres", genre)}
                        className="flex items-center justify-center w-4 h-4 rounded-full bg-accent-blue/20 hover:bg-accent-blue/40 transition-colors text-xs"
                    >
                        ×
                    </button>
                </span>
            ))
        )}

        {filters.min_score && (
            <span className="flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-sm px-4 py-1.5 rounded-full">
                Min Score: {filters.min_score}
                <button 
                    onClick={() => onRemove("min_score", null)}
                    className="flex items-center justify-center w-4 h-4 rounded-full bg-accent-blue/20 hover:bg-accent-blue/40 transition-colors text-xs"
                >
                    ×
                </button>
            </span>
        )}

        {filters.min_episodes && (
            <span className="flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-sm px-4 py-1.5 rounded-full">
                Min Episodes: {filters.min_episodes}
                <button 
                    onClick={() => onRemove("min_episodes", null)}
                    className="flex items-center justify-center w-4 h-4 rounded-full bg-accent-blue/20 hover:bg-accent-blue/40 transition-colors text-xs"
                >
                    ×
                </button>
            </span>
        )}

        {filters.status && (
            <span className="flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-sm px-4 py-1.5 rounded-full">
                {LABEL_MAP[filters.status]}
                <button 
                    onClick={() => onRemove("status", null)}
                    className="flex items-center justify-center w-4 h-4 rounded-full bg-accent-blue/20 hover:bg-accent-blue/40 transition-colors text-xs"
                >
                    ×
                </button>
            </span>
        )}

        {filters.type && (
            <span className="flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-sm px-4 py-1.5 rounded-full">
                {LABEL_MAP[filters.type]}
                <button 
                    onClick={() => onRemove("type", null)}
                    className="flex items-center justify-center w-4 h-4 rounded-full bg-accent-blue/20 hover:bg-accent-blue/40 transition-colors text-xs"
                >
                    ×
                </button>
            </span>
        )}

        {filters.order_by && (filters.order_by !== "popularity" || filters.sort !== "asc") && (
            <span className="flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-sm px-4 py-1.5 rounded-full">
                Sort: {LABEL_MAP[filters.order_by]} {LABEL_MAP[filters.sort]}
                <button 
                    onClick={() => onRemove("order_by", null)}
                    className="flex items-center justify-center w-4 h-4 rounded-full bg-accent-blue/20 hover:bg-accent-blue/40 transition-colors text-xs"
                >
                    ×
                </button>
            </span>
        )}
    </div>
  )
}

export default FilterChips
