import { LoginRequest } from "../../data/model/auth/LoginRequest";
import { LoginData, User } from "../../data/model/auth/LoginResponse";
import { RegisterRequest } from "../../data/model/auth/RegisterRequest";


export interface AuthViewModelState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    accessJti: string | null;
    refreshJti: string | null;

    isLoading: boolean;
    error: string | null;
    isReady: boolean;
    setReady: () => void;
    login: (body: LoginRequest) => Promise<LoginData | null>;
    setAuth: (data: Partial<LoginData>) => void;
    register: (body: RegisterRequest) => Promise<LoginData | null>;
    logout: () => void;
}
