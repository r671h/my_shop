"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
    id: number;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logOut: ()=> void;
    isLoggedIn: boolean;
};

const Authcontext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode}){
    const [user,setUser] = useState<User | null>(null);
    const [token,setToken] = useState<string | null>(null);

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if(storedUser && storedToken){
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    },[]);

    const login = (user: User, token: string) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user",JSON.stringify(user));
        localStorage.setItem("token",token);
    }

    const logOut = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    return (
        <Authcontext.Provider value={{user,token,login,logOut,isLoggedIn: !!user}}>
            {children}
        </Authcontext.Provider>
    );
}

export function useAuth(){
    const context = useContext(Authcontext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}