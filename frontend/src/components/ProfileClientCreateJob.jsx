import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    IconButton,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/ProfileClientCreateJob.css";

const ProfileClientCreateJob = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
        name: "Company Name",
        profilePicture: "/default-avatar.png",
    };

    const [open, setOpen] = useState(false);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [jobPosts, setJobPosts] = useState([]);

    useEffect(() => {
        const savedJobs = JSON.parse(localStorage.getItem("clientJobs")) || [];
        setJobPosts(savedJobs);
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlePostJob = () => {
        if (!jobTitle || !jobDescription || !budget) {
            alert("Please fill in all fields before posting.");
            return;
        }

        const newJob = {
            id: Date.now(),
            title: jobTitle,
            description: jobDescription,
            budget,
            date: new Date().toLocaleDateString(),
            user: storedUser.name,
            profilePicture: storedUser.profilePicture,
        };

        const updatedJobs = [newJob, ...jobPosts];
        setJobPosts(updatedJobs);
        localStorage.setItem("clientJobs", JSON.stringify(updatedJobs));

        setJobTitle("");
        setJobDescription("");
        setBudget("");
        handleClose();
    };

    return (
        <Box className="create-job-container">
            {/* Job Input Box */}
            <Box className="job-input-box" onClick={handleOpen}>
                <Avatar src={storedUser.profilePicture} className="job-avatar" />
                <TextField
                    className="job-text-field"
                    placeholder="Post a new job..."
                    fullWidth
                    disabled
                />
            </Box>

            {/* Job Modal */}
            <Dialog open={open} onClose={handleClose} className="job-dialog">
                <DialogTitle>
                    <Box className="job-header">
                        <Avatar src={storedUser.profilePicture} className="job-modal-avatar" />
                        <span>{storedUser.name}</span>
                        <IconButton className="close-button" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Job Title"
                        fullWidth
                        variant="outlined"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="job-title-input"
                    />
                    <TextField
                        label="Job Description"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="job-description-input"
                    />
                    <TextField
                        label="Budget ($)"
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="job-budget-input"
                    />
                    <Box className="job-actions">
                        <Button startIcon={<ImageIcon />} className="job-action-button">
                            Add Image
                        </Button>
                        <Button startIcon={<AttachFileIcon />} className="job-action-button">
                            Attach File
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePostJob} className="job-submit-button">
                        Post Job
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfileClientCreateJob;
