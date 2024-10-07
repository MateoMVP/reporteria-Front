import axios from "axios";

const AXIOS = axios.create(
    {
        baseURL: "https://6f3906702b06.sn.mynetname.net/redbox/api"
    }
)

export default AXIOS