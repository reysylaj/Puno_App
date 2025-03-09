import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Punetefundit = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // Store selected job for popup
  const [proposalText, setProposalText] = useState(""); // Proposal input
  const [showProposalPopup, setShowProposalPopup] = useState(false); // Proposal popup

  // Load jobs and saved jobs from localStorage
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
    setJobs(storedJobs);

    const storedSavedJobs = JSON.parse(localStorage.getItem("savedTalentJobs")) || [];
    setSavedJobs(storedSavedJobs);
  }, []);

  // Toggle job save/unsave
  const handleSaveJob = (job) => {
    let updatedSavedJobs;

    if (savedJobs.some(savedJob => savedJob.id === job.id)) {
      // Unsave job
      updatedSavedJobs = savedJobs.filter(savedJob => savedJob.id !== job.id);
    } else {
      // Save job
      updatedSavedJobs = [...savedJobs, job];
    }

    setSavedJobs(updatedSavedJobs);
    localStorage.setItem("savedTalentJobs", JSON.stringify(updatedSavedJobs));
  };

  // Open Job Details Popup
  const handleOpenJobDetails = (job) => {
    setSelectedJob(job);
  };

  // Close Job Details Popup
  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  // Open Proposal Popup
  const handleOpenProposalPopup = () => {
    setShowProposalPopup(true);
  };

  // Close Proposal Popup
  const handleCloseProposalPopup = () => {
    setShowProposalPopup(false);
    setProposalText(""); // Clear input
  };

  // ✅ Submit Proposal
  // ✅ Submit Proposal
  const handleSubmitProposal = () => {
    if (!proposalText.trim()) return;

    const storedUser = JSON.parse(localStorage.getItem("user")); // Talent user info

    // ✅ Check if the talent has already sent a proposal for this job
    const existingTalentProposals = JSON.parse(localStorage.getItem("talentProposals")) || [];
    const hasAlreadyApplied = existingTalentProposals.some(proposal =>
      proposal.jobId === selectedJob.id && proposal.talentName === storedUser.name
    );

    if (hasAlreadyApplied) {
      alert("❌ You have already sent a proposal for this job.");
      return;
    }

    const newProposal = {
      id: Date.now(),
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      client: selectedJob.user,
      talentName: storedUser.name,
      talentProfilePic: storedUser.profilePicture || "/default-avatar.png",
      date: new Date().toLocaleDateString(),
      coverLetter: proposalText,
      status: "Pending"
    };

    // ✅ Save proposal for Talent
    const updatedTalentProposals = [newProposal, ...existingTalentProposals];
    localStorage.setItem("talentProposals", JSON.stringify(updatedTalentProposals));

    // ✅ Save proposal for Client
    const existingClientProposals = JSON.parse(localStorage.getItem("receivedProposals")) || [];
    localStorage.setItem("receivedProposals", JSON.stringify([newProposal, ...existingClientProposals]));

    console.log("✅ Proposal Submitted:", newProposal); // Debugging Log

    // ✅ Trigger event for ProfileTalentTotalProposalsSent.jsx
    window.dispatchEvent(new Event("proposalUpdated"));

    // ✅ Force manual UI refresh
    setTimeout(() => {
      window.location.reload();
    }, 500);

    handleCloseProposalPopup(); // Close proposal popup
  };



  return (
    <Box className="jobs-container">
      <Typography variant="h5" className="jobs-title">Punët e Fundit</Typography>

      {jobs.length === 0 ? (
        <Typography className="no-jobs">No jobs available.</Typography>
      ) : (
        jobs.map((job) => (
          <Card key={job.id} className="job-card" onClick={() => handleOpenJobDetails(job)}>
            <CardContent>
              <Typography variant="h6">{job.title}</Typography>
              <Typography className="job-description">{job.description}</Typography>
              <Typography className="job-budget">💰 Budget: ${job.budget}</Typography>

              {/* Save Button */}
              <IconButton onClick={(e) => { e.stopPropagation(); handleSaveJob(job); }}>
                {savedJobs.some(savedJob => savedJob.id === job.id) ? (
                  <BookmarkIcon color="primary" />
                ) : (
                  <BookmarkBorderIcon />
                )}
              </IconButton>
            </CardContent>
          </Card>
        ))
      )}

      {/* Job Details Popup */}
      <Dialog open={!!selectedJob} onClose={handleCloseJobDetails} fullWidth maxWidth="sm">
        <DialogTitle>{selectedJob?.title || "Job Details"}</DialogTitle>
        <DialogContent>
          <Typography><strong>Description:</strong> {selectedJob?.description}</Typography>
          <Typography><strong>Budget:</strong> ${selectedJob?.budget}</Typography>
          <Typography><strong>Job Type:</strong> {selectedJob?.jobType}</Typography>
          <Typography><strong>Work Mode:</strong> {selectedJob?.workMode}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJobDetails}>Close</Button>
          <Button onClick={handleOpenProposalPopup} variant="contained" color="primary">
            Send Proposal
          </Button>
        </DialogActions>
      </Dialog>

      {/* Proposal Popup */}
      <Dialog open={showProposalPopup} onClose={handleCloseProposalPopup} fullWidth maxWidth="sm">
        <DialogTitle>Send Proposal for {selectedJob?.title || "Job"}</DialogTitle>
        <DialogContent>
          <Typography>Write a cover letter explaining why you are the best fit:</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={proposalText}
            onChange={(e) => setProposalText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProposalPopup}>Cancel</Button>
          <Button onClick={handleSubmitProposal} variant="contained" color="primary">
            Submit Proposal
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Punetefundit;
