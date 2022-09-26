import axios from "axios";

const customerApi = axios.create({
    baseURL: 'https://localhost:7061/api'
});

export default customerApi;