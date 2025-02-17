import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";

type StoreState = {
    isMobile: boolean;
    selectedView: string;
    setSelectedView: (value: string) => void;
    setMobile: (value: boolean) => void;
};
export const useStore = create(
    persist<StoreState>(
        (set) => ({
            isMobile: false,
            selectedView: "channel",
            setSelectedView: (value) => set({ selectedView: value }),
            setMobile: (value) => set({ isMobile: value }),
        }),
        {
            name: "counter-storage",
        }
    )
);

type AuthState = {
    user: Record<string, any>;
    isAuthenticated: boolean;
    token: string | null;
    setUser: (user: Record<string, string>) => void;
    setToken: (token: string) => void;
    login: (token: string) => void;
    logout: (token: string) => void;
};
export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            user: [],
            isAuthenticated: false,
            token: null,
            setUser: (user: Record<string, string>) => set({ user }),
            setToken: (token: string) => set({ token }),
            checkAuth: () => set({ isAuthenticated: !!localStorage.getItem("token") }),
            login: (token: string) => set({ isAuthenticated: true, token: token }),
            logout: () => set({ isAuthenticated: false, token: null }),
        }),
        {
            name: "auth-storage",
        }
    )
);

type Inputs<T = string | number> = Record<string, T>;

type InputState<T = string | number> = {
    inputs: Inputs<T>;
    setInput: <K extends keyof Inputs<T>>(name: K, value: Inputs<T>[K]) => void;
};

export const useInputStore = create(
    devtools<InputState>((set) => ({
        inputs: {},
        setInput: (name, value) =>
            set((state) => ({
                inputs: {
                    ...state.inputs,
                    [name]: value,
                },
            })),
    }))
);
type ToggleState = {
    toggles: Record<string, boolean>;
    setToggles: (name: string, value: boolean) => void;
};
export const useToggleStore = create(
    devtools<ToggleState>((set) => ({
        toggles: {},
        setToggles: (name, value) =>
            set((state) => ({
                toggles: {
                    ...state.toggles,
                    [name]: value,
                },
            })),
    }))
);
