import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ProfileTalentSavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const storedJobs = JSON.parse(localStorage.getItem("savedTalentJobs")) || [];
        setSavedJobs(storedJobs);
    }, []);

    const handleRemove = (id) => {
        const updatedJobs = savedJobs.filter(job => job.id !== id);
        setSavedJobs(updatedJobs);
        localStorage.setItem("savedTalentJobs", JSON.stringify(updatedJobs));
    };

    return (
        <Box>
            <Typography variant="h5">Saved Jobs</Typography>
            {savedJobs.map((job) => (
                <Card key={job.id}>
                    <CardContent>
                        <Typography variant="h6">{job.title}</Typography>
                        <Typography>💰 Budget: ${job.budget}</Typography>
                        <IconButton onClick={() => handleRemove(job.id)}><DeleteIcon /></IconButton>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default ProfileTalentSavedJobs;
