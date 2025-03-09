import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from "@mui/material";

const ProposalPopup = ({ job, open, onClose }) => {
    const [coverLetter, setCoverLetter] = useState("");
    const [storedUser, setStoredUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")) || {
            name: "Anonymous Talent",
            profilePicture: "/default-avatar.png",
        };
        setStoredUser(user);
    }, []);

    if (!job || !storedUser) return null; // ✅ Prevents crashing if `job` or `storedUser` is null

    const handleSubmitProposal = () => {
        if (!coverLetter.trim()) return;

        const newProposal = {
            id: Date.now(),
            jobId: job.id,
            jobTitle: job.title,
            client: job.user,
            talentName: storedUser.name, // ✅ Fixed talent name
            talentProfilePic: storedUser.profilePicture || "/default-avatar.png",
            date: new Date().toLocaleDateString(),
            coverLetter,
            status: "Pending",
        };

        // ✅ Save proposal for talent
        const existingTalentProposals = JSON.parse(localStorage.getItem("talentProposals")) || [];
        localStorage.setItem("talentProposals", JSON.stringify([newProposal, ...existingTalentProposals]));

        // ✅ Save proposal for client
        const existingClientProposals = JSON.parse(localStorage.getItem("receivedProposals")) || [];
        localStorage.setItem("receivedProposals", JSON.stringify([newProposal, ...existingClientProposals]));

        console.log("Proposal Submitted:", newProposal); // ✅ Debugging Log

        setCoverLetter(""); // ✅ Clear input field
        onClose(); // ✅ Close popup
        document.activeElement.blur(); // ✅ Fix Material-UI `aria-hidden` issue
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Send Proposal for {job?.title || "Unknown Job"}</DialogTitle>
            <DialogContent>
                <Typography>Write a cover letter explaining why you are the best fit:</Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmitProposal} variant="contained" color="primary">
                    Submit Proposal
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProposalPopup;
