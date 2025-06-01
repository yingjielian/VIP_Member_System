import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081/api', // Adjust if your backend runs elsewhere
});

export default api;
