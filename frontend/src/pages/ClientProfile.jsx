import { Box } from "@mui/material";
import ProfileClientHeader from "../components/ProfileClientHeader";
import ProfileClientSkills from "../components/ProfileClientSkills";
import ProfileClientCreateJob from "../components/ProfileClientCreateJob";
import ProfileClientJobListings from "../components/ProfileClientJobListings";
import ProfileClientReceivedProposals from "../components/ProfileClientReceivedProposals";
import ProfileClientSavedJobs from "../components/ProfileClientSavedJobs";
import ProfileClientSavedTalents from "../components/ProfileClientSavedTalents";
import ProfileClientTalentHistory from "../components/ProfileClientTalentHistory";
import ProfileClientEarningsDashboard from "../components/ProfileClientEarningsDashboard";
import ProfileClientMessenger from "../components/ProfileClientMessenger";
import ProfileClientTestimonials from "../components/ProfileClientTestimonials";
import "../styles/ClientProfile.css";

const ClientProfile = () => {
    return (
        <Box className="client-profile-container">
            <ProfileClientHeader />
            <ProfileClientSkills />
            <ProfileClientCreateJob />
            <ProfileClientJobListings />
            <ProfileClientReceivedProposals />
            <ProfileClientSavedJobs />
            <ProfileClientSavedTalents />
            <ProfileClientTalentHistory />
            <ProfileClientEarningsDashboard />
            <ProfileClientMessenger />
            <ProfileClientTestimonials />
        </Box>
    );
};

export default ClientProfile;
