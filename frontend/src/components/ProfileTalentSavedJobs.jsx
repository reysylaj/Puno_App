import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    IconButton,
    Grid,
    Pagination
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ProfileTalentSavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 3; // ✅ Display 3 jobs per row

    useEffect(() => {
        const storedJobs = JSON.parse(localStorage.getItem("savedTalentJobs")) || [];
        setSavedJobs(storedJobs);
    }, []);

    // ✅ Remove job from saved list
    const handleRemove = (id) => {
        const updatedJobs = savedJobs.filter(job => job.id !== id);
        setSavedJobs(updatedJobs);
        localStorage.setItem("savedTalentJobs", JSON.stringify(updatedJobs));
    };

    // ✅ Pagination logic
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = savedJobs.slice(indexOfFirstJob, indexOfLastJob);

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h5" sx={{ marginBottom: "15px" }}>Saved Jobs</Typography>

            {savedJobs.length === 0 ? (
                <Typography>No saved jobs yet.</Typography>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {currentJobs.map((job) => (
                            <Grid item xs={12} sm={6} md={4} key={job.id}> {/* ✅ 3 jobs per row */}
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardContent>
                                        <Typography variant="h6">{job.title}</Typography>
                                        <Typography variant="body2">💰 Budget: ${job.budget}</Typography>
                                        <IconButton onClick={() => handleRemove(job.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* ✅ Pagination Component */}
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <Pagination
                            count={Math.ceil(savedJobs.length / jobsPerPage)}
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                            color="primary"
                        />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ProfileTalentSavedJobs;
