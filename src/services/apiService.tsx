import axios from 'Axios';

export const api = axios.create({

  baseURL: "http://localhost:3000",

});
