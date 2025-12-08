import axios from "axios";
import { LoginRequest } from '../model/auth/LoginRequest';
import { LoginResponse } from '../model/auth/LoginResponse';
import { api } from "../network/apiClient";

export const login = async(body: LoginRequest): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>("/auth/login", body);
    console.log("🔵 [LOGIN RESPONSE]:", res.data);
    return res.data;
}
