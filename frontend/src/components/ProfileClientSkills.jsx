import { useState, useEffect } from "react";
import { Box, Typography, TextField, Chip, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import "../styles/ProfileClientSkills.css";

const ProfileClientSkills = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
        bio: "We are a leading company hiring top talent worldwide.",
        skills: ["Recruiting", "Project Management", "Budgeting"],
    };

    const [bio, setBio] = useState(storedUser.bio);
    const [editingBio, setEditingBio] = useState(false);
    const [skills, setSkills] = useState(storedUser.skills);
    const [newSkill, setNewSkill] = useState("");

    // Save bio & skills to localStorage
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify({ ...storedUser, bio, skills }));
    }, [bio, skills]);

    // Handle bio editing
    const handleEditBio = () => setEditingBio(!editingBio);
    const handleSaveBio = () => setEditingBio(false);

    // Handle skill addition
    const handleAddSkill = () => {
        if (newSkill.trim() !== "") {
            setSkills([...skills, newSkill]);
            setNewSkill("");
        }
    };

    // Handle skill removal
    const handleDeleteSkill = (skillToDelete) => {
        setSkills(skills.filter(skill => skill !== skillToDelete));
    };

    return (
        <Box className="client-skills-container">
            {/* Bio Section */}
            <Box className="client-bio">
                <Typography variant="h5">About Us</Typography>
                {editingBio ? (
                    <TextField
                        fullWidth
                        multiline
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="bio-textarea"
                    />
                ) : (
                    <Typography variant="body1" className="bio-text">{bio}</Typography>
                )}
                <IconButton onClick={editingBio ? handleSaveBio : handleEditBio} className="edit-icon">
                    {editingBio ? <DoneIcon /> : <EditIcon />}
                </IconButton>
            </Box>

            {/* Skills Section */}
            <Box className="client-skills">
                <Typography variant="h6">Our Key Skills</Typography>
                <Box className="skills-list">
                    {skills.map((skill, index) => (
                        <Chip
                            key={index}
                            label={skill}
                            onDelete={() => handleDeleteSkill(skill)}
                            className="skill-chip"
                        />
                    ))}
                </Box>

                {/* Add Skill Input */}
                <Box className="add-skill">
                    <TextField
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="skill-input"
                    />
                    <Button onClick={handleAddSkill} className="add-skill-button">ADD SKILL</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfileClientSkills;
