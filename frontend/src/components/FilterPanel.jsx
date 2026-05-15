import { Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, FormLabel, Slider, Typography, TextField, Button } from '@mui/material'

const genres = [
    "Action",
    "Adventure",
    "Cars",
    "Comedy",
    "Avante Garde",
    "Demons",
    "Mystery",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Game",
    "Hentai",
    "Historical",
    "Horror",
    "Kids",
    "Martial Arts",
    "Mecha",
    "Music",
    "Parody",
    "Samurai",
    "Romance",
    "School",
    "Sci Fi",
    "Shoujo",
    "Girls Love",
    "Shounen",
    "Boys Love",
    "Space",
    "Sports",
    "Super Power",
    "Vampire",
    "Harem",
    "Slice Of Life",
    "Supernatural",
    "Military",
    "Police",
    "Psychological",
    "Suspense",
    "Seinen",
    "Josei",
    "Award Winning",
    "Gourmet",
    "Work Life",
    "Erotica",
]

const types = {
    "TV": "tv",
    "Movie": "movie",
    "OVA": "ova",
    "Special": "special",
    "ONA": "ona",
    "Music": "music"
}

const status = {
    "Airing": "airing",
    "Completed": "complete",
    "Upcoming": "upcoming"
}

const order_by = {
    "Title": "title",
    "Start Date": "start_date",
    "End Date": "end_date",
    "Episodes": "episodes",
    "Score": "score",
    "Rank": "rank",
    "Popularity": "popularity",
    "Members": "members",
    "Favorites": "favorites"
}

const sort_by = {
    "Ascending" : "asc",
    "Descending" : "desc"
}

const FilterPanel = ( {filters, onFilterChange, onApplyFilters} ) => {
  return (
    <div>
      <FormControl>
        <InputLabel>Genre</InputLabel>
        <Select
            value={filters.genres?.[0] || ""}
            onChange={(e) => onFilterChange("genres", [e.target.value])}
            label="Genres"
        >
            {genres.map((genre) => (
                <MenuItem
                    key={genre}
                    value={genre}
                >
                    {genre}
                </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Types</InputLabel>
        <Select
            value={filters.type || ""}
            onChange={(e) => onFilterChange("type", e.target.value)}
            label="Types"
        >
            {Object.entries(types).map(([label, value]) => (
                <MenuItem
                    key={value}
                    value={value}
                >
                    {label}
                </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select
            value={filters.status || ""}
            onChange={(e) => onFilterChange("status", e.target.value)}
            label="Status"
        >
            {Object.entries(status).map(([label, value]) => (
                <MenuItem
                    key={value}
                    value={value}
                >
                    {label}
                </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Order By</InputLabel>
        <Select
            value={filters.order_by || ""}
            onChange={(e) => onFilterChange("order_by", e.target.value)}
            label="Order By"
        >
            {Object.entries(order_by).map(([label, value]) => (
                <MenuItem
                    key={value}
                    value={value}
                >
                    {label}
                </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Sort By</FormLabel>
        <RadioGroup
            value={filters.sort || ""}
            onChange={(e) => onFilterChange("sort", e.target.value)}
            label="Sort"
        >
            {Object.entries(sort_by).map(([label, value]) => (
                <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={label}
                />
            ))}
        </RadioGroup>
      </FormControl>

      <Typography>Minimum Score</Typography>
      <Slider
        value={filters.min_score || 0}
        onChange={(e, newValue) => onFilterChange("min_score", newValue)}
        min={0}
        max={10}
        step={0.1}
        valueLabelDisplay='auto'
        defaultValue={8}
      />

      <TextField
        label="Mininum Episodes"
        type="number"
        value={filters.min_episodes || 0}
        onChange={(e) => onFilterChange("min_episodes", parseInt(e.target.value))}
        inputProps={{ min: 1 }}
      >

      </TextField>

      <Button variant='contained' onClick={onApplyFilters}>
        Apply Filters
      </Button>

    </div>
  )
}

export default FilterPanel
