import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../styles/ProfileClientJobListings.css";

const ProfileClientJobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 4;

    useEffect(() => {
        const savedJobs = JSON.parse(localStorage.getItem("clientJobs")) || [];
        setJobs(savedJobs);
    }, []);

    // Handle deleting a job post
    const handleDelete = (id) => {
        const updatedJobs = jobs.filter((job) => job.id !== id);
        setJobs(updatedJobs);
        localStorage.setItem("clientJobs", JSON.stringify(updatedJobs));
    };

    // Pagination logic
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => prev - 1);

    return (
        <Box className="job-listings-container">
            <Typography variant="h5" className="job-listings-title">Job Listings</Typography>

            {currentJobs.length === 0 ? (
                <Typography className="no-jobs">No jobs posted yet.</Typography>
            ) : (
                currentJobs.map((job) => (
                    <Card key={job.id} className="job-card">
                        <CardContent>
                            <Box className="job-header">
                                <Avatar src={job.profilePicture} className="job-avatar" />
                                <Box>
                                    <Typography variant="h6">{job.title}</Typography>
                                    <Typography variant="body2" className="job-date">{job.date}</Typography>
                                </Box>
                            </Box>
                            <Typography className="job-description">{job.description}</Typography>
                            <Typography className="job-budget">💰 Budget: ${job.budget}</Typography>
                        </CardContent>
                        <CardActions className="job-actions">
                            <IconButton onClick={() => handleDelete(job.id)}><DeleteIcon /></IconButton>
                        </CardActions>
                    </Card>
                ))
            )}

            {/* Pagination Controls */}
            <Box className="pagination-controls">
                <Button onClick={prevPage} disabled={currentPage === 1}>
                    <NavigateBeforeIcon /> Prev
                </Button>
                <Typography>Page {currentPage}</Typography>
                <Button onClick={nextPage} disabled={indexOfLastJob >= jobs.length}>
                    Next <NavigateNextIcon />
                </Button>
            </Box>
        </Box>
    );
};

export default ProfileClientJobListings;
