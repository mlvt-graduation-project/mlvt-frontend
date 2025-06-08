import React, { createContext, useContext, useState, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthContextType {
  authToken: string | null;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
  remainingToken: number;
  SetRemainingToken: (token: number) => void;
  AddRemainingToken: (token: number) => void;
  SubstractRemainingToken: (token: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const [remainingToken, setRemainingToken] = useState<number>(0);

  const login = (token: string, userId: string) => {
    setAuthToken(token);
    setUserId(userId);
    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    <Navigate to="/login" replace />;
  };

  const SetRemainingToken = (token: number) => {
    setRemainingToken(token);
  };

  const AddRemainingToken = (token: number) => {
    setRemainingToken((prevData) => prevData + token);
  };

  const SubstractRemainingToken = (token: number) => {
    setRemainingToken((prevData) => prevData - token);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        userId,
        login,
        logout,
        remainingToken,
        SetRemainingToken,
        AddRemainingToken,
        SubstractRemainingToken,
      }}
    >
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
