import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";

const JobDetailsPopup = ({ job, open, onClose, onSendProposal }) => {
    if (!job) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{job.title}</DialogTitle>
            <DialogContent>
                <Typography><strong>Company:</strong> {job.user}</Typography>
                <Typography><strong>Description:</strong> {job.description}</Typography>
                <Typography><strong>Budget:</strong> 💰 ${job.budget}</Typography>
                <Typography><strong>Job Type:</strong> {job.jobType}</Typography>
                <Typography><strong>Work Mode:</strong> {job.workMode}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button onClick={() => onSendProposal(job)} variant="contained" color="primary">
                    Send Proposal
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default JobDetailsPopup;
