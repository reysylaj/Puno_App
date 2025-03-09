import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/TalentSideRegistration.css";

const TalentSideRegistration = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategory = location.state?.category || sessionStorage.getItem("selectedTalentCategory") || "Nuk ka kategori të zgjedhur";

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        jobRole: "",
    });

    useEffect(() => {
        if (!location.state?.category) {
            sessionStorage.setItem("selectedTalentCategory", selectedCategory);
        }
    }, [selectedCategory, location.state]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Fjalëkalimet nuk përputhen!");
            return;
        }

        const newTalent = {
            id: Date.now(),
            name: formData.firstName,
            surname: formData.lastName,
            email: formData.email,
            password: formData.password,
            role: "talent",
            category: selectedCategory,
            jobSeekingCategory: selectedCategory,
            jobRole: formData.jobRole,
            skills: [],
            savedJobs: [],
            proposalsSent: [],
            profilePicture: null,
            coverImage: null,
        };

        console.log("✅ Saving user data:", newTalent);

        // ✅ Retrieve existing users and store new talent
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = [...storedUsers, newTalent];
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // ✅ Save active user
        localStorage.setItem("user", JSON.stringify(newTalent));

        loginUser(newTalent); // ✅ Save user in Context API

        setTimeout(() => {
            navigate("/talent-profile");
        }, 500);
    };





    return (
        <Box className="registration-container">
            <Typography variant="h4" className="registration-title">VENDOS TE DHENAT E TUA PER TU REGJISTRUAR</Typography>
            <Typography variant="body1" className="selected-category">
                Kategoria e zgjedhur: <strong>{selectedCategory}</strong>
            </Typography>
            <form onSubmit={handleSubmit} className="registration-form">
                <TextField label="Emri" name="firstName" value={formData.firstName} onChange={handleChange} required fullWidth />
                <TextField label="Mbiemri" name="lastName" value={formData.lastName} onChange={handleChange} required fullWidth />
                <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required fullWidth />
                <TextField label="Roli i punës që kërkoni" name="jobRole" value={formData.jobRole} onChange={handleChange} required fullWidth />
                <TextField label="Fjalëkalimi" type="password" name="password" value={formData.password} onChange={handleChange} required fullWidth />
                <TextField label="Përsërit Fjalëkalimin" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required fullWidth />
                <Button type="submit" className="submit-button">REGJISTROHU</Button>
            </form>
        </Box>
    );
};

export default TalentSideRegistration;
