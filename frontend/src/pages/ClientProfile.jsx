import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ProfileClientHeader from "../components/ProfileClientHeader";
import ProfileClientCreateJob from "../components/ProfileClientCreateJob";
import ProfileClientJobListings from "../components/ProfileClientJobListings";
import ProfileClientJobDetails from "../components/ProfileClientJobDetails";
import ProfileClientReceivedProposals from "../components/ProfileClientReceivedProposals";

import ProfileClientMessenger from "../components/ProfileClientMessenger";
import "../styles/ClientProfile.css";

const ClientProfile = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const savedJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
        setJobs(savedJobs);
    }, []);

    const handleNewJob = (newJob) => {
        const updatedJobs = [newJob, ...jobs];
        setJobs(updatedJobs);
        localStorage.setItem("allJobs", JSON.stringify(updatedJobs));
    };

    return (
        <Box className="client-profile-container">
            <ProfileClientHeader />
            <ProfileClientCreateJob onJobPosted={handleNewJob} /> {/* ✅ Pass function */}
            <ProfileClientJobListings jobs={jobs} />
            <ProfileClientJobDetails />
            <ProfileClientReceivedProposals />
            <ProfileClientMessenger />

        </Box>
    );
};

export default ClientProfile;
