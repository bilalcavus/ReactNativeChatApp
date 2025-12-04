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
    login: (body: LoginRequest) => Promise<LoginData | null>;
    logout: () => void;
}
