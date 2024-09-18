import axios from 'axios';

const fetchSuggestions = async (query) => {
    try {
        const response = await axios.post('http://localhost:4000/search', {
            query: query
        });
        return response.data || [];
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
};

export default fetchSuggestions;