import { useState, useEffect } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from "@mui/material";
import "../styles/ProfileTalentTotalProposalsSent.css";

const ProfileTalentTotalProposalsSent = () => {
    const [proposals, setProposals] = useState([]);

    // ✅ Load proposals from localStorage
    const loadProposals = () => {
        console.log("🔄 Fetching proposals from localStorage...");
        const storedProposals = JSON.parse(localStorage.getItem("talentProposals")) || [];
        console.log("✅ Loaded proposals:", storedProposals);
        setProposals(storedProposals);
    };

    useEffect(() => {
        loadProposals(); // Initial load

        // ✅ Listen for "proposalUpdated" event
        const handleProposalUpdate = () => {
            console.log("📢 Proposal update event detected. Reloading proposals...");
            loadProposals();
        };

        window.addEventListener("proposalUpdated", handleProposalUpdate);

        return () => {
            window.removeEventListener("proposalUpdated", handleProposalUpdate);
        };
    }, []);

    // ✅ Refresh UI every 2 seconds (Failsafe)
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("⏳ Checking for proposal updates...");
            loadProposals();
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // ✅ Filter options
    const [filter, setFilter] = useState("All");
    const filteredProposals = filter === "All" ? proposals : proposals.filter((p) => p.status === filter);

    return (
        <Box className="proposals-container">
            <Typography variant="h5" className="section-title">Total Proposals Sent</Typography>
            <Typography variant="h6" className="total-proposals">Total: {proposals.length}</Typography>

            {/* Filter Dropdown */}
            <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-dropdown">
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>

            {/* Proposals Table */}
            <TableContainer component={Paper} className="proposals-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Client</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProposals.length > 0 ? (
                            filteredProposals.map((proposal) => (
                                <TableRow key={proposal.id}>
                                    <TableCell>{proposal.jobTitle}</TableCell>
                                    <TableCell>{proposal.client}</TableCell>
                                    <TableCell>{proposal.date}</TableCell>
                                    <TableCell className={`status-cell ${proposal.status.toLowerCase()}`}>
                                        {proposal.status}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="no-data">No proposals found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ProfileTalentTotalProposalsSent;
