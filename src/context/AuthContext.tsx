import React, { createContext, useContext, useState, ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface AuthContextType {
    authToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem("authToken"));

    const login = (token: string) => {
        setAuthToken(token);
        localStorage.setItem("authToken", token);
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem("authToken");
        // navigate("/login"); // Only navigate if useNavigate is available
        <Navigate to="/login" replace />
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
