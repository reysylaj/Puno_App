import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardActions, Avatar, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/ProfileClientJobListings.css";

const ProfileClientJobListings = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const savedJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
        setJobs(savedJobs);
    }, []);

    const handleDelete = (id) => {
        const updatedJobs = jobs.filter((job) => job.id !== id);
        setJobs(updatedJobs);
        localStorage.setItem("allJobs", JSON.stringify(updatedJobs));
    };

    return (
        <Box className="job-listings-container">
            <Typography variant="h5">Job Listings</Typography>

            {jobs.length === 0 ? (
                <Typography>No jobs posted yet.</Typography>
            ) : (
                jobs.map((job) => (
                    <Card key={job.id} className="job-card">
                        <CardContent>
                            <Typography variant="h6">{job.title}</Typography>
                            <Typography>{job.description}</Typography>
                            <Typography>💰 Budget: ${job.budget}</Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={() => handleDelete(job.id)}><DeleteIcon /></IconButton>
                        </CardActions>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default ProfileClientJobListings;
