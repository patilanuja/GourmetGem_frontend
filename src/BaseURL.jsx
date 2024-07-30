import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://52.204.247.191:8000', // Replace with your base URL
  timeout: 5000, // Set the timeout for requests (optional)
  headers: { 'Content-Type': 'application/json' }, // Set common headers (optional)
});

export default instance;