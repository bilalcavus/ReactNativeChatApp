import { LoginRequest } from "../../data/model/auth/LoginRequest";
import { LoginData, User } from "../../data/model/auth/LoginResponse";


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
    logout: () => void;
}
