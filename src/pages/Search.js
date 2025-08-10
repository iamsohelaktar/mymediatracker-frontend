import { useState } from "react";
import SearchResults from '../components/SearchResults';

function Search() {
    const [searchTitle, setSearchTitle] = useState('');
    const [filter, setFilter] = useState('tv'); //Default media type is TV Shows.
    const [submitted, setSubmitted] = useState(null);
    const [sort, setSort] = useState('none');
    const [recentSearches, setRecentSearches] = useState([]);

    // Executes everytime a search is submitted:
    // The search text and filter (type) is re-set to be sent to the SearchResult component so data can be fetched.
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted({
            title: searchTitle.trim(),
            type: filter,
            sort: sort
        }); 
        setRecentSearches([...recentSearches, searchTitle.trim()]);
    }

    return (
        <div className="Search">
            <div>
            <h1>Search</h1>
            <form className="search-bar" onSubmit={handleSubmit}>
                <div>
                <input 
                    type="text" 
                    value={searchTitle} 
                    placeholder="Search..." 
                    onChange={(e) => setSearchTitle(e.target.value)} 
                />
                
                <button type="submit">🔍︎</button>
                </div>

                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="anime">Anime</option>
                    <option value="book">Books</option>
                    <option value="manga">Manga</option>
                    <option value="movie">Movies</option>
                    <option value="tv">TV Shows</option>
                </select>
                
                <span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="none">Sort: None</option>
                    {(filter==='anime' || filter==='manga') && <option value="rating">Sort: Rating </option>}
                </select>
                </span>
            </form>
            <div className="recent-search-wrapper">
                <span>Recent Searches: </span>
                <div className="recent-search-container">
                    {[...recentSearches].reverse().map((search, i) => 
                            <button className="recent-search" key={i} onClick={(e) => setSearchTitle(e.target.innerText)}>{search}</button>
                    )}
                </div>
                <button className="clear"onClick={() => setRecentSearches([])}>X</button>
            </div>
            {submitted && (
                <SearchResults 
                    title={submitted.title} 
                    type={submitted.type} 
                    sort={submitted.sort}
                />
            )}
            {!submitted && (
                <div style={{'marginLeft': '2rem', 'backgroundColor' : 'var(--primary-bg)', 'padding':'1rem 2rem', 'borderRadius':'7px'}}>
                    <h2>Coming soon:</h2>
                    <li>Notes 📝</li>
                    <li>'Favoriting' media ⭐</li>
                    <li>Custom lists 📃</li>
                </div>
            )}
            </div>
        </div>
    );
}

export default Search;