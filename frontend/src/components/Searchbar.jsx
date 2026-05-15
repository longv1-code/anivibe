const Searchbar = ({ onSearch, query, setQuery }) => {
  const handleSubmit = () => {
    onSearch(query) // calls parent's function with the query
  }

  return (
    <div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleSubmit}>Search</button>
    </div>
  )
}

export default Searchbar
