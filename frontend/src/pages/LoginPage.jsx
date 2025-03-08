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

        // ✅ Retrieve the user data from localStorage
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            setError("Llogaria nuk ekziston! Ju lutemi regjistrohuni.");
            return;
        }

        const userData = JSON.parse(storedUser);

        console.log("Stored User:", userData); // Debugging
        console.log("Entered Email:", formData.email);
        console.log("Entered Password:", formData.password);

        // ✅ Validate Email and Password for all roles
        if (formData.email === userData.email && formData.password === userData.password) {
            loginUser(userData); // ✅ Save user in Context

            // ✅ Redirect Based on Role
            if (userData.role === "client") navigate("/client-profile");
            else if (userData.role === "talent") navigate("/talent-profile");
            else if (userData.role === "agency") navigate("/agency-profile");

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

                    <Link to="/forgot-password" className="forgot-password-link">Harrove fjalëkalimin?</Link>

                    <Button type="submit" className="login-button">LOGIN</Button>
                </form>

                {/* ✅ Add SSO login icons (Google, LinkedIn, GitHub) */}
                <Box className="sso-container">
                    <img src="/icons/google.png" alt="Google Login" className="sso-icon" />
                    <img src="/icons/linkedin.png" alt="LinkedIn Login" className="sso-icon" />
                    <img src="/icons/github.png" alt="GitHub Login" className="sso-icon" />
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
