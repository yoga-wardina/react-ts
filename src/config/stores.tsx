import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";

export const useStore = create(
    persist(
        (set) => ({
            isMobile: false,
            selectedView: "channel",
            setSelectedView: (value: String) => set({ selectedView: value }),
            setMobile: (value: String) => set({ isMobile: value }),
        }),
        {
            name: "counter-storage",
        }
    )
);

export const useAuthStore = create(
    persist(
        (set) => ({
            user: [],
            isAuthenticated: false,
            token: null,
            setUser: (user: Record<string, string>) => set({ user }),
            setToken: (token: String) => set({ token }),
            checkAuth: () => set({ isAuthenticated: !!localStorage.getItem("token") }),
            login: (token: String) => set({ isAuthenticated: true, token: token }),
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
