import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx"; // ✅ Import AuthContext

const ClientSideRegistration = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategory = location.state?.category || "Nuk u përzgjodh kategori";

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Fjalëkalimet nuk përputhen!");
            return;
        }

        const userData = {
            id: Date.now(),
            name: formData.firstName,
            surname: formData.lastName,
            email: formData.email,
            password: formData.password,
            role: "client",
            category: selectedCategory,
        };

        console.log("User Data to be Saved:", userData);

        // ✅ Retrieve existing users and store new client
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = [...storedUsers, userData];
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // ✅ Save current user session
        localStorage.setItem("user", JSON.stringify(userData));

        loginUser(userData); // ✅ Save user in Context

        navigate("/client-profile");
    };





    return (
        <Box className="registration-container">
            <Typography variant="h4" className="register-title">
                VENDOS TE DHENAT E TUA PER TU REGJISTRUAR:
            </Typography>

            <Typography variant="body1" className="selected-category">
                {selectedCategory}
            </Typography>

            <form onSubmit={handleSubmit} className="registration-form">
                <TextField
                    label="Emër"
                    name="firstName"
                    fullWidth
                    required
                    onChange={handleChange}
                />
                <TextField
                    label="Mbiemër"
                    name="lastName"
                    fullWidth
                    required
                    onChange={handleChange}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    required
                    onChange={handleChange}
                />
                <TextField
                    label="Fjalëkalimi"
                    name="password"
                    type="password"
                    fullWidth
                    required
                    onChange={handleChange}
                />
                <TextField
                    label="Përsërit Fjalëkalimin"
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    required
                    onChange={handleChange}
                />

                <Button type="submit" className="submit-button">
                    SUBMIT
                </Button>
            </form>
        </Box>
    );
};

export default ClientSideRegistration;
