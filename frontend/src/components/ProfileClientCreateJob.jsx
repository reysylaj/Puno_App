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
import CloseIcon from "@mui/icons-material/Close";
import "../styles/ProfileClientCreateJob.css";

const ProfileClientCreateJob = ({ onJobPosted = () => { } }) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
        name: "Company Name",
        profilePicture: "/default-avatar.png",
    };

    const [open, setOpen] = useState(false);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [jobType, setJobType] = useState("Full-Time"); // New field
    const [workMode, setWorkMode] = useState("On-Site"); // New field
    const [jobPosts, setJobPosts] = useState([]);

    useEffect(() => {
        const savedJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
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
            jobType,
            workMode,
            date: new Date().toLocaleDateString(),
            user: storedUser.name,
            profilePicture: storedUser.profilePicture,
        };

        const updatedJobs = [newJob, ...jobPosts];
        setJobPosts(updatedJobs);

        // ✅ Ensure localStorage updates AFTER state change
        setTimeout(() => {
            localStorage.setItem("allJobs", JSON.stringify(updatedJobs));
            console.log("Job Posted:", newJob); // ✅ Debugging
        }, 100);

        // ✅ Notify parent component if provided
        if (onJobPosted) {
            onJobPosted(newJob);
        }

        // ✅ Reset form fields
        setJobTitle("");
        setJobDescription("");
        setBudget("");
        handleClose();
    };

    return (
        <Box className="create-job-container">
            <Box className="job-input-box" onClick={handleOpen}>
                <Avatar src={storedUser.profilePicture} className="job-avatar" />
                <TextField className="job-text-field" placeholder="Post a new job..." fullWidth disabled />
            </Box>

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
                    <TextField label="Job Title" fullWidth value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                    <TextField label="Job Description" fullWidth multiline rows={4} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                    <TextField label="Budget ($)" fullWidth type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
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
