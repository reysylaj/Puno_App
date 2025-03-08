import { useState } from "react";
import { Box, Typography, Card, CardContent, Chip } from "@mui/material";
import "../styles/ProfileTalentProposals.css";

const ProfileTalentProposals = () => {
    const [proposals] = useState([
        {
            id: 1,
            jobTitle: "React Developer",
            company: "Tech Solutions",
            status: "Pending",
            date: "March 2, 2024",
        },
        {
            id: 2,
            jobTitle: "UI/UX Designer",
            company: "Creative Agency",
            status: "Accepted",
            date: "March 1, 2024",
        },
        {
            id: 3,
            jobTitle: "Full Stack Engineer",
            company: "InnovateHub",
            status: "Rejected",
            date: "February 28, 2024",
        },
    ]);

    // Count total proposals
    const totalProposals = proposals.length;

    return (
        <Box className="proposals-container">
            <Typography variant="h6" className="proposals-title">
                📩 Total Proposals Sent: {totalProposals}
            </Typography>

            <Box className="proposals-list">
                {proposals.map((proposal) => (
                    <Card key={proposal.id} className="proposal-card">
                        <CardContent>
                            <Typography variant="h6">{proposal.jobTitle}</Typography>
                            <Typography variant="body2" className="proposal-company">
                                {proposal.company}
                            </Typography>
                            <Typography variant="body2" className="proposal-date">
                                Sent on: {proposal.date}
                            </Typography>
                            <Chip
                                label={proposal.status}
                                className={`status-chip ${proposal.status.toLowerCase()}`}
                            />
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ProfileTalentProposals;
