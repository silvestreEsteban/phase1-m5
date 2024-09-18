import '../styles/SearchCatalogue.css';
import { useState } from 'react';
import fetchSuggestions from './FetchSuggestions';

const SearchCatalogue = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setSearch(query);

        if (query.length > 2) { 
            const fetchedSuggestions = await fetchSuggestions(query);
            setSuggestions(fetchedSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = async () => {
        try {
            const response = await fetch('http://localhost:4000/catalogue/listings/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ search })
            });
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion);
        setSuggestions([]);
    };

    return (
        <div className='search-catalogue-div'>
            <h1>Search Catalogue</h1>
            <h5>If we have the item in our catalogue it will show up when you submit!</h5>
            <div className='csm-div'>
                <span id='input-button-span'><input
                    type="text"
                    placeholder="Search..."
                    id='catalogue-search-input'
                    value={search}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                /><button id="search-button" onClick={handleSearch}>Search</button></span>
                <div className='suggestions'>
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className='suggestion-item'
                        onClick={() => handleSuggestionClick(suggestion)}>

                            {suggestion}
                        </div>
                    ))}
                </div>
            </div>
            
            <br />
            <div className='search-results'>
                {results.map((result, index) => (
                    <div key={index} className='search-result'>
                        <p className='showing-result'>
                            Title: {result.title}
                            <br />
                            Description: {result.description}
                            <br />
                            Starting Price: {result.start_price}
                            <br />
                            Reserve Price: {result.reserve_price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchCatalogue;