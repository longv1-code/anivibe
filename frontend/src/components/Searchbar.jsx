import { Button } from "@mui/material"

const Searchbar = ({ onSearch, query, setQuery }) => {
  return (
    <div className="flex gap-0 max-w-xl mx-auto">
        <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
            placeholder="e.g. dark thriller with a genius protagonist..."
            className="flex-1 bg-bg-card border border-border-subtle rounded-l-full px-6 py-4 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue transition-colors font-body text-sm"
        />
        <Button
            onClick={() => onSearch(query)} // calls parent's function with the query
            className="bg-accent-blue text-bg-primary font-display font-semibold px-8 py-4 rounded-r-full hover:opacity-90 transition-opacity whitespace-nowrap"
        >
            Search
        </Button>
    </div>
  )
}

export default Searchbar
