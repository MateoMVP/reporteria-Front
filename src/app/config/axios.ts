import axios from "axios";

const AXIOS = axios.create(
    {
        baseURL: "http://localhost:3005/api"
    }
)

export default AXIOS