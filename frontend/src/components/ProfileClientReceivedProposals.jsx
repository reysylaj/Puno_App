import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import "../styles/ProfileClientReceivedProposals.css";

const ProfileClientReceivedProposals = () => {
    const [proposals, setProposals] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const storedProposals = JSON.parse(localStorage.getItem("receivedProposals")) || [];
        console.log("Loaded Proposals in ProfileClientReceivedProposals:", storedProposals); // ✅ Debugging Log
        setProposals(storedProposals);
    }, []);


    // Handle opening job details popup
    const handleOpenProposals = (jobTitle) => {
        const jobProposals = proposals.filter(proposal => proposal.jobTitle === jobTitle);
        setSelectedJob({ jobTitle, proposals: jobProposals });
        setOpen(true);
    };

    // Handle closing the popup
    const handleClose = () => {
        setOpen(false);
        setSelectedJob(null);
    };

    // Handle proposal action (Accept/Reject)
    const handleAction = (proposalId, action) => {
        const updatedProposals = proposals.map(proposal =>
            proposal.id === proposalId ? { ...proposal, status: action } : proposal
        );
        setProposals(updatedProposals);
        localStorage.setItem("receivedProposals", JSON.stringify(updatedProposals));
    };

    // Group proposals by job title
    const groupedProposals = proposals.reduce((acc, proposal) => {
        acc[proposal.jobTitle] = (acc[proposal.jobTitle] || 0) + 1;
        return acc;
    }, {});

    return (
        <Box className="received-proposals-container">
            <Typography variant="h5" className="received-proposals-title">Proposals Received</Typography>

            {proposals.length === 0 ? (
                <Typography className="no-proposals">No proposals received yet.</Typography>
            ) : (
                <>
                    {Object.entries(groupedProposals).map(([jobTitle, count]) => (
                        <Card key={jobTitle} className="proposal-card">
                            <CardContent>
                                <Typography variant="h6">{jobTitle}</Typography>
                                <Typography variant="body2">Total Proposals: {count}</Typography>
                                <Button className="view-proposals-button" onClick={() => handleOpenProposals(jobTitle)}>
                                    View Proposals
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </>
            )}

            {/* Proposal Details Popup */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Proposals for {selectedJob?.jobTitle}</DialogTitle>
                <DialogContent>
                    {selectedJob?.proposals.map((proposal) => (
                        <List key={proposal.id} className="proposal-list">
                            <ListItem>
                                <Avatar src={proposal.talentProfilePic} />
                                <ListItemText
                                    primary={`${proposal.talentName} - ${proposal.talentRole}`}
                                    secondary={proposal.text}
                                />
                                {proposal.status ? (
                                    <Typography className={`proposal-status ${proposal.status}`}>
                                        {proposal.status === "Accepted" ? "✅ Accepted" : "❌ Rejected"}
                                    </Typography>
                                ) : (
                                    <Box className="proposal-actions">
                                        <Button className="accept-button" onClick={() => handleAction(proposal.id, "Accepted")}>
                                            Accept
                                        </Button>
                                        <Button className="reject-button" onClick={() => handleAction(proposal.id, "Rejected")}>
                                            Reject
                                        </Button>
                                        <IconButton className="message-button">
                                            <ChatIcon />
                                        </IconButton>
                                    </Box>
                                )}
                            </ListItem>
                        </List>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className="close-button">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfileClientReceivedProposals;
