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
        console.log("✅ Loaded Proposals in ProfileClientReceivedProposals:", storedProposals);
        setProposals(storedProposals);
    }, []);

    // ✅ Open popup to view proposals for a specific job
    const handleOpenProposals = (jobTitle) => {
        const jobProposals = proposals.filter(proposal => proposal.jobTitle === jobTitle);
        setSelectedJob({ jobTitle, proposals: jobProposals });
        setOpen(true);
    };

    // ✅ Close the popup
    const handleClose = () => {
        setOpen(false);
        setSelectedJob(null);
    };

    // ✅ Handle Accept/Decline/Pending actions
    const handleAction = (proposalId, action) => {
        const updatedProposals = proposals.map(proposal =>
            proposal.id === proposalId ? { ...proposal, status: action } : proposal
        );
        setProposals(updatedProposals);
        localStorage.setItem("receivedProposals", JSON.stringify(updatedProposals));

        // ✅ Update the talent's proposal status in localStorage
        const talentProposals = JSON.parse(localStorage.getItem("talentProposals")) || [];
        const updatedTalentProposals = talentProposals.map(proposal =>
            proposal.id === proposalId ? { ...proposal, status: action } : proposal
        );
        localStorage.setItem("talentProposals", JSON.stringify(updatedTalentProposals));

        // ✅ Trigger an update for the talent component
        window.dispatchEvent(new Event("proposalUpdated"));
    };


    // ✅ Group proposals by job title
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
                                <Avatar src={proposal.talentProfilePic || "/default-avatar.png"} />
                                <ListItemText
                                    primary={`${proposal.talentName} ${proposal.talentSurname}`}
                                    secondary={
                                        <>
                                            <Typography variant="body2">
                                                <strong>Cover Letter:</strong> {proposal.coverLetter}
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>Status:</strong> {proposal.status}
                                            </Typography>
                                        </>
                                    }
                                />
                                <Box className="proposal-actions">
                                    <Button className="accept-button" onClick={() => handleAction(proposal.id, "Accepted")}>
                                        Accept
                                    </Button>
                                    <Button className="reject-button" onClick={() => handleAction(proposal.id, "Rejected")}>
                                        Decline
                                    </Button>
                                    <Button className="pending-button" onClick={() => handleAction(proposal.id, "Pending")}>
                                        Pending
                                    </Button>
                                    <IconButton className="message-button">
                                        <ChatIcon />
                                    </IconButton>
                                </Box>
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
