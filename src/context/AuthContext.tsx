"use client";
import {
    getUserApi,
    logoutApi,
    signupApi,
    singinApi,
} from "@/httpServices/authService";
import {useRouter} from "next/navigation";
import React, {createContext, useContext, useEffect, useReducer} from "react";
import toast from "react-hot-toast";
import {actionType, CurrentAuthContextType, initialStateType} from "@/types/Context";


const AuthContext = createContext<CurrentAuthContextType | null>(null);

const initialState: initialStateType = {
    user: {},
    isAuthenticated: false,
    isLoading: true,
    error: "",
};

function authReducer(state: initialStateType , action: actionType) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true,
            };
        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case "signin":
            return {
                user: action.payload,
                isAuthenticated: true,
            };
        case "signup":
            return {
                user: action.payload,
                isAuthenticated: true,
            };
        case "user/loaded":
            return {
                user: action.payload,
                isAuthenticated: true,
            };
        case "logout":
            return {
                user: null,
                isAuthenticated: false,
            };
        default:
            throw new Error("Unknown action!");
    }
}

export default function AuthProvier({children}: { children: React.ReactNode }) {

    const router = useRouter();

    const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(authReducer, initialState);


    async function signin(values) {
        dispatch({type: "loading"});
        try {
            const {
                data: {message, user},
            } = await singinApi(values);
            dispatch({type: "signin", payload: user});
            toast.success(message);
            router.push("/profile");
            router.replace("/");
        } catch (err) {
            const error = err?.response?.data?.message;
            dispatch({type: "rejected", payload: error});
            toast.error(error);
        }
    }

    async function signup(values) {
        dispatch({type: "loading"});
        try {
            const {
                data: {message, user},
            } = await signupApi(values);
            dispatch({type: "signup", payload: user});
            toast.success(message);
            router.replace("/");
        } catch (err) {
            const error = err?.response?.data?.message;
            dispatch({type: "rejected", payload: error});
            toast.error(error);
        }
    }

    async function getUser() {
        dispatch({type: "loading"});
        try {
            const {
                data: {user},
            } = await getUserApi(null);
            dispatch({type: "user/loaded", payload: user});
        } catch (err) {
            const error = err?.response?.data?.message;
            dispatch({type: "rejected", payload: error});
        }
    }

    async function logout() {
        try {
            await logoutApi();
            router.push("/");
            dispatch({type: "logout"});
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        // getUser();
        async function fetchData() {
            await getUser();
        }

        fetchData();
    }, []);


    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isLoading,
            signin,
            signup,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("not found Auth context");
    return useContext(AuthContext);
}
