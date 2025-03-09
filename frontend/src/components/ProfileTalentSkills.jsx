import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../styles/ProfileTalentSkills.css";

const ProfileTalentSkills = () => {
    // Retrieve stored user data or default values
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
        name: "Talent",
        email: "default@email.com",
        role: "talent",
        bio: "Write about yourself here...",
        skills: [] // ✅ Always ensure `skills` exists
    };

    const [bio, setBio] = useState(storedUser.bio || "Write about yourself here...");
    const [skills, setSkills] = useState(storedUser.skills || []);
    const [newSkill, setNewSkill] = useState("");
    const [editingBio, setEditingBio] = useState(false);

    // ✅ Ensure updates do not remove other user data
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify({
            ...storedUser, // Preserve all other user data
            bio,
            skills
        }));
    }, [bio, skills]);

    // Handle adding a new skill
    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    // Handle removing a skill
    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    // Handle bio edit toggle
    const handleEditBio = () => setEditingBio(!editingBio);

    return (
        <Box className="profile-talent-skills">
            {/* Bio Section */}
            <Box className="bio-section">
                <Typography variant="h5" className="bio-title">
                    About Me
                    <IconButton onClick={handleEditBio} className="edit-icon">
                        <EditIcon />
                    </IconButton>
                </Typography>
                {editingBio ? (
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        onBlur={handleEditBio}
                    />
                ) : (
                    <Typography variant="body1" className="bio-text">
                        {bio}
                    </Typography>
                )}
            </Box>

            {/* Skills Section */}
            <Typography variant="h5" className="skills-title">Skills & Expertise</Typography>
            <Box className="skills-container">
                {skills.length > 0 ? (
                    skills.map((skill, index) => (
                        <Chip
                            key={index}
                            label={skill}
                            onDelete={() => handleRemoveSkill(skill)}
                            className="skill-chip"
                        />
                    ))
                ) : (
                    <Typography>No skills added yet.</Typography>
                )}
            </Box>

            {/* Add Skill Section */}
            <Box className="add-skill-container">
                <TextField
                    label="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    fullWidth
                    className="skill-input"
                />
                <Button onClick={handleAddSkill} className="add-skill-btn">
                    ADD SKILL
                </Button>
            </Box>
        </Box>
    );
};

export default ProfileTalentSkills;
