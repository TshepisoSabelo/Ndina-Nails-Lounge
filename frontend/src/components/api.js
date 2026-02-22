import axios from 'axios';

//create an instance of axios with default settings
const api = axios.create({
    baseURL: 'http://localhost:8000', //base URL for all API requests
    headers: {
        'Content-Type': 'application/json', //default content type for requests
    },
});

// Add a request interceptor to include the token in headers if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); //get token from local storage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; //add token to Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); //handle request errors
    }
);

export default api;