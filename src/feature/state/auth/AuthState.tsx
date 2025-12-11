import { LoginRequest } from "../../../data/model/auth/LoginRequest";
import { User, LoginData } from "../../../data/model/auth/LoginResponse";
import { LogoutRequest } from "../../../data/model/auth/LogoutRequest";
import { RegisterRequest } from "../../../data/model/auth/RegisterRequest";



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
    logout: (body: LogoutRequest) => Promise<boolean | null>;
}
