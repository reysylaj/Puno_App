import { useState, useEffect } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from "@mui/material";
import "../styles/ProfileTalentTotalProposalsSent.css";

const ProfileTalentTotalProposalsSent = () => {
    const [proposals, setProposals] = useState(JSON.parse(localStorage.getItem("proposals")) || []);
    const [filter, setFilter] = useState("All");

    // Dummy Data (if no proposals exist)
    useEffect(() => {
        if (proposals.length === 0) {
            const dummyProposals = [
                { id: 1, jobTitle: "React Developer", company: "TechCorp", date: "2024-02-25", status: "Pending" },
                { id: 2, jobTitle: "Frontend Engineer", company: "InnoSoft", date: "2024-02-20", status: "Accepted" },
                { id: 3, jobTitle: "UI/UX Designer", company: "CreativeLabs", date: "2024-02-15", status: "Rejected" },
            ];
            setProposals(dummyProposals);
            localStorage.setItem("proposals", JSON.stringify(dummyProposals));
        }
    }, []);

    // Filter proposals based on status
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
                            <TableCell>Company</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProposals.length > 0 ? (
                            filteredProposals.map((proposal) => (
                                <TableRow key={proposal.id} className={`proposal-row ${proposal.status.toLowerCase()}`}>
                                    <TableCell>{proposal.jobTitle}</TableCell>
                                    <TableCell>{proposal.company}</TableCell>
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
