import axios from "axios";

export default axios.create({
    baseURL: "https://smarthome.raccoonsoftware.pl",
    timeout: 20000,
    headers: { "X-Custom-Header": "application/json" }
});
