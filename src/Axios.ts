import axios from "axios";

export default axios.create({
    baseURL: "https://kroscon-api.raccoonsoftware.pl",
    //baseURL: 'http://localhost:3001',
    timeout: 20000,
    headers: { "X-Custom-Header": "application/json" }
});
