import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your base URL
  // baseURL: 'http://load-balancer-344825617.us-east-1.elb.amazonaws.com',
  timeout: 5000, // Set the timeout for requests (optional)
  headers: { 'Content-Type': 'application/json' }, // Set common headers (optional)
});

export default instance;