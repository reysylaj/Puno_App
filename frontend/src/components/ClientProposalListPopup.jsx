import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText } from "@mui/material";

const ClientProposalListPopup = ({ proposals, open, onClose, onAccept, onDecline }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Proposals Received</DialogTitle>
            <DialogContent>
                <List>
                    {proposals.map((proposal) => (
                        <ListItem key={proposal.id}>
                            <ListItemText
                                primary={`${proposal.jobTitle} - ${proposal.client}`}
                                secondary={proposal.coverLetter}
                            />
                            <Button onClick={() => onAccept(proposal.id)} color="success">Accept</Button>
                            <Button onClick={() => onDecline(proposal.id)} color="error">Decline</Button>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ClientProposalListPopup;
