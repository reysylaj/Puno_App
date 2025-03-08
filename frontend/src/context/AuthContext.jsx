import { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    // ✅ Load user from localStorage when the app starts
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Function to Log In User
    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // ✅ Save user permanently
    };

    // Function to Log Out User (But Keep Data in LocalStorage)
    const logoutUser = () => {
        setUser(null);
        // ❌ Don't remove user from localStorage to keep them logged in
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
