import axios from "axios";
import { LoginRequest } from '../model/auth/LoginRequest';
import { LoginResponse } from '../model/auth/LoginResponse';


export const login = async(body: LoginRequest): Promise<LoginResponse> => {
    const res = await axios.post<LoginResponse>("http://localhost:4000/auth/login", body);
    console.log("🔵 [LOGIN RESPONSE]:", res.data);
    return res.data;
}
