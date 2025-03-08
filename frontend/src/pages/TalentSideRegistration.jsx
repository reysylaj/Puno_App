import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext.jsx"; // ✅ Import AuthContext
import "../styles/TalentSideRegistration.css"; // Custom styles

const TalentSideRegistration = () => {
    const { loginUser } = useContext(AuthContext); // ✅ Access login function
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategory = location.state?.category || "Nuk ka kategori të zgjedhur"; // Handle undefined case

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        jobRole: "",  // ✅ New field for job role
    });


    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // Handle form submission
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
            role: "talent",
            category: selectedCategory,
            jobSeekingCategory: selectedCategory,
            jobRole: formData.jobRole,  // ✅ Store jobRole
            skills: [],
            savedJobs: [],
            proposalsSent: [],
            profilePicture: null,
            coverImage: null,
        };

        console.log("Saving user data:", userData); // ✅ Debugging log

        localStorage.setItem("user", JSON.stringify(userData)); // ✅ Store user in LocalStorage
        loginUser(userData); // ✅ Save user in Context API

        navigate("/talent-profile"); // ✅ Redirect to Talent Profile
    };







    return (
        <Box className="registration-container">
            {/* Title */}
            <Typography variant="h4" className="registration-title">
                VENDOS TE DHENAT E TUA PER TU REGJISTRUAR
            </Typography>

            {/* Display selected category */}
            <Typography variant="body1" className="selected-category">
                Kategoria e zgjedhur: <strong>{selectedCategory}</strong>
            </Typography>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="registration-form">
                <TextField label="Emri" name="firstName" value={formData.firstName} onChange={handleChange} required fullWidth />
                <TextField label="Mbiemri" name="lastName" value={formData.lastName} onChange={handleChange} required fullWidth />
                <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required fullWidth />
                <TextField label="Roli i punës që kërkoni" name="jobRole" value={formData.jobRole} onChange={handleChange} required fullWidth />
                <TextField label="Fjalëkalimi" type="password" name="password" value={formData.password} onChange={handleChange} required fullWidth />
                <TextField label="Përsërit Fjalëkalimin" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required fullWidth />

                {/* Submit Button */}
                <Button type="submit" className="submit-button">
                    SUBMIT
                </Button>
            </form>
        </Box>
    );
};

export default TalentSideRegistration;
