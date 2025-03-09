import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/ProfileTalentSavedJobs.css";

const ProfileTalentSavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);

    // Load saved jobs from localStorage
    useEffect(() => {
        const storedJobs = JSON.parse(localStorage.getItem("savedTalentJobs")) || [];
        setSavedJobs(storedJobs);
    }, []);

    // Remove saved job
    const handleRemoveJob = (id) => {
        const updatedJobs = savedJobs.filter(job => job.id !== id);
        setSavedJobs(updatedJobs);
        localStorage.setItem("savedTalentJobs", JSON.stringify(updatedJobs));
    };

    return (
        <Box className="saved-jobs-container">
            <Typography variant="h5">Saved Jobs</Typography>

            {savedJobs.length === 0 ? (
                <Typography>No saved jobs yet.</Typography>
            ) : (
                savedJobs.map((job) => (
                    <Card key={job.id} className="saved-job-card">
                        <CardContent>
                            <Typography variant="h6">{job.title}</Typography>
                            <Typography>💰 Budget: ${job.budget}</Typography>

                            {/* Remove Button */}
                            <IconButton onClick={() => handleRemoveJob(job.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default ProfileTalentSavedJobs;
