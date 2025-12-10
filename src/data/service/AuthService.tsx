import axios from "axios";
import { LoginRequest } from '../model/auth/LoginRequest';
import { LoginResponse } from '../model/auth/LoginResponse';
import { api } from "../network/apiClient";
import { RegisterRequest } from "../model/auth/RegisterRequest";

export const login = async(body: LoginRequest): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>("/auth/login", body);
    return res.data;
}

export const register = async(body: RegisterRequest): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>("/auth/register", body);
    return res.data;
}
