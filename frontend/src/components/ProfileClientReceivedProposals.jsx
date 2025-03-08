import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Avatar, Button, Pagination } from "@mui/material";
import "../styles/ProfileClientReceivedProposals.css";

const ProfileClientReceivedProposals = () => {
    const [proposals, setProposals] = useState([]);
    const [page, setPage] = useState(1);
    const proposalsPerPage = 4;

    useEffect(() => {
        const storedProposals = JSON.parse(localStorage.getItem("receivedProposals")) || [];
        setProposals(storedProposals);
    }, []);

    // Handle pagination change
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // Handle accepting/rejecting proposal
    const handleAction = (id, action) => {
        const updatedProposals = proposals.map(proposal =>
            proposal.id === id ? { ...proposal, status: action } : proposal
        );
        setProposals(updatedProposals);
        localStorage.setItem("receivedProposals", JSON.stringify(updatedProposals));
    };

    // Get current page proposals
    const paginatedProposals = proposals.slice((page - 1) * proposalsPerPage, page * proposalsPerPage);

    return (
        <Box className="received-proposals-container">
            <Typography variant="h5" className="received-proposals-title">Proposals Received</Typography>

            {proposals.length === 0 ? (
                <Typography className="no-proposals">No proposals received yet.</Typography>
            ) : (
                <>
                    {paginatedProposals.map((proposal) => (
                        <Card key={proposal.id} className="proposal-card">
                            <CardContent>
                                <Box className="proposal-header">
                                    <Avatar src={proposal.talentProfilePic} className="talent-avatar" />
                                    <Box>
                                        <Typography variant="h6">{proposal.talentName}</Typography>
                                        <Typography variant="body2" className="proposal-date">
                                            {proposal.date}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography className="proposal-text">{proposal.text}</Typography>
                                <Box className="proposal-actions">
                                    {proposal.status ? (
                                        <Typography className={`proposal-status ${proposal.status}`}>
                                            {proposal.status === "Accepted" ? "✅ Accepted" : "❌ Rejected"}
                                        </Typography>
                                    ) : (
                                        <>
                                            <Button className="accept-button" onClick={() => handleAction(proposal.id, "Accepted")}>
                                                Accept
                                            </Button>
                                            <Button className="reject-button" onClick={() => handleAction(proposal.id, "Rejected")}>
                                                Reject
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                    <Pagination
                        count={Math.ceil(proposals.length / proposalsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        className="pagination"
                    />
                </>
            )}
        </Box>
    );
};

export default ProfileClientReceivedProposals;
