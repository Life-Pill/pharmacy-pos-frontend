import axios from 'axios';
export default axios.create({
  baseURL: 'http://localhost:8081/lifepill/v1/',
  headers: {
    'Content-type': 'application/json',
  },
});
