import { useState } from "react";
import { Box, Typography, Avatar, Button, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "../styles/ProfileClientHeader.css";

const ProfileClientHeader = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
        name: "Jane",
        surname: "Doe",
        role: "Hiring Manager",
        preferredLink: "https://company.com/janedoe",
        jobsPosted: 10,
        profilePicture: null,
        coverImage: null,
    };

    const [user, setUser] = useState(storedUser);
    const [editing, setEditing] = useState(false);

    // Handle profile image upload
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUser((prev) => ({ ...prev, profilePicture: e.target.result }));
                localStorage.setItem("user", JSON.stringify({ ...user, profilePicture: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle cover image upload
    const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUser((prev) => ({ ...prev, coverImage: e.target.result }));
                localStorage.setItem("user", JSON.stringify({ ...user, coverImage: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Toggle edit mode
    const handleEdit = () => setEditing(!editing);
    const handleSave = () => {
        localStorage.setItem("user", JSON.stringify(user));
        setEditing(false);
    };

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <Box className="profile-client-header">
            {/* Cover Image */}
            <Box className="cover-container">
                <img src={user.coverImage || "/default-cover.jpg"} alt="Cover" className="cover-image" />
                <IconButton component="label" className="edit-cover-btn">
                    <CameraAltIcon />
                    <input type="file" hidden onChange={handleCoverImageChange} />
                </IconButton>
            </Box>

            {/* Profile Info */}
            <Box className="profile-info">
                <Box className="avatar-container">
                    <Avatar src={user.profilePicture || "/default-avatar.png"} className="profile-avatar" />
                    <IconButton component="label" className="edit-avatar-btn">
                        <CameraAltIcon />
                        <input type="file" hidden onChange={handleProfilePictureChange} />
                    </IconButton>
                </Box>

                {/* Editable Fields */}
                <Box className="details-container">
                    {editing ? (
                        <>
                            <TextField name="name" value={user.name} onChange={handleChange} size="small" />
                            <TextField name="surname" value={user.surname} onChange={handleChange} size="small" />
                            <TextField name="role" value={user.role} onChange={handleChange} size="small" />
                            <TextField name="preferredLink" value={user.preferredLink} onChange={handleChange} size="small" />
                        </>
                    ) : (
                        <>
                            <Typography variant="h4">{user.name} {user.surname}</Typography>
                            <Typography variant="h6" className="role-text">{user.role}</Typography>
                            <Typography variant="body2">
                                <a href={user.preferredLink} target="_blank" rel="noopener noreferrer">
                                    {user.preferredLink}
                                </a>
                            </Typography>
                        </>
                    )}

                    {/* Edit and Save Buttons */}
                    {editing ? (
                        <Button variant="contained" color="success" onClick={handleSave}>
                            Save
                        </Button>
                    ) : (
                        <IconButton onClick={handleEdit} className="edit-btn">
                            <EditIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>

            {/* Jobs Posted */}
            <Box className="jobs-posted">
                <Typography variant="h6">Total Jobs Posted: {user.jobsPosted}</Typography>
            </Box>
        </Box>
    );
};

export default ProfileClientHeader;
