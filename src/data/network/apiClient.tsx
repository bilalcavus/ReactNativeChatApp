import axios from "axios";
import { attachInterceptors } from "./Interceptors";

export const api = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

attachInterceptors(api);
