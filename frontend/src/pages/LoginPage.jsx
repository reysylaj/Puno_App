import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Box, Typography, TextField, Button } from "@mui/material";
import "../styles/LoginPage.css";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Retrieve ALL users from localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        if (storedUsers.length === 0) {
            setError("Llogaria nuk ekziston! Ju lutemi regjistrohuni.");
            return;
        }

        // ✅ Find user in stored users
        const userData = storedUsers.find(
            (user) => user.email === formData.email && user.password === formData.password
        );

        if (userData) {
            console.log("✅ User found, saving to localStorage:", userData);

            // ✅ Save user to localStorage before redirecting
            localStorage.setItem("user", JSON.stringify(userData));

            loginUser(userData); // ✅ Save user in Context API

            // ✅ Redirect Based on Role
            if (userData.role === "client") {
                navigate("/client-profile");
            } else if (userData.role === "talent") {
                navigate("/talent-profile");
            } else if (userData.role === "agency") {
                navigate("/agency-profile");
            }
        } else {
            setError("Email ose fjalëkalimi i pasaktë!");
        }
    };




    return (
        <Box className="login-container">
            <Box className="login-box">
                <Typography variant="h5" className="login-header">Identifikohu</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField label="Email" name="email" required fullWidth onChange={handleChange} className="input-field" />
                    <TextField label="Fjalëkalimi" name="password" type="password" required fullWidth onChange={handleChange} className="input-field" />
                    <Button type="submit" className="login-button">LOGIN</Button>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
