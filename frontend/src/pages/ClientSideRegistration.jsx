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
            name: formData.firstName,
            surname: formData.lastName,
            email: formData.email,
            password: formData.password, // ✅ Ensure password is saved
            role: "client",
            category: selectedCategory,
        };

        console.log("User Data to be Saved:", userData); // ✅ Debugging Step 1

        loginUser(userData); // ✅ Save user in Context
        localStorage.setItem("user", JSON.stringify(userData)); // ✅ Save in localStorage

        console.log("Stored User in localStorage:", localStorage.getItem("user")); // ✅ Debugging Step 2

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
