import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, IconButton, Button } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Punetefundit = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const allJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
    setJobs(allJobs);

    const saved = JSON.parse(localStorage.getItem("savedTalentJobs")) || [];
    setSavedJobs(saved);
  }, []);

  const toggleSaveJob = (job) => {
    const isSaved = savedJobs.some((savedJob) => savedJob.id === job.id);

    let updatedSavedJobs;
    if (isSaved) {
      updatedSavedJobs = savedJobs.filter((savedJob) => savedJob.id !== job.id);
    } else {
      updatedSavedJobs = [job, ...savedJobs];
    }

    setSavedJobs(updatedSavedJobs);
    localStorage.setItem("savedTalentJobs", JSON.stringify(updatedSavedJobs));
  };

  return (
    <Box>
      <Typography variant="h4">Latest Jobs</Typography>
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardContent>
            <Typography variant="h6">{job.title}</Typography>
            <Typography>{job.description}</Typography>
            <Typography>💰 Budget: ${job.budget}</Typography>
            <IconButton onClick={() => toggleSaveJob(job)}>
              {savedJobs.some((savedJob) => savedJob.id === job.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Punetefundit;
