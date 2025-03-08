import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import ProfileTalentHeader from "../components/ProfileTalentHeader";
import ProfileTalentSkills from "../components/ProfileTalentSkills";
import ProfileTalentCreatePost from "../components/ProfileTalentCreatePost";
import ProfileTalentRecentProjects from "../components/ProfileTalentRecentProjects";
import ProfileTalentSavedJobs from "../components/ProfileTalentSavedJobs";
import ProfileTalentProposals from "../components/ProfileTalentProposals";
import ProfileTalentClientHistory from "../components/ProfileTalentClientHistory";
import ProfileTalentSavedClients from "../components/ProfileTalentSavedClients";
import ProfileTalentDashboardEarnings from "../components/ProfileTalentDashboardEarnings";
import ProfileTalentMessenger from "../components/ProfileTalentMessenger";
import ProfileTalentTestimonials from "../components/ProfileTalentTestimonial";

const TalentProfile = () => {
    const [storedUser, setStoredUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        console.log("Loaded User Data in TalentProfile:", savedUser);

        if (savedUser) {
            setStoredUser(savedUser);
        } else {
            console.error("No user data found in localStorage.");
        }

        const savedPosts = JSON.parse(localStorage.getItem("talentPosts")) || [];
        setPosts(savedPosts);
    }, []);

    const addPost = (newPost) => {
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem("talentPosts", JSON.stringify(updatedPosts));
    };

    if (!storedUser) {
        return <h1>Loading Profile...</h1>;
    }

    return (
        <Container maxWidth="lg">
            <Box className="talent-profile">
                <ProfileTalentHeader user={storedUser} />
                <ProfileTalentSkills />
                <ProfileTalentCreatePost addPost={addPost} />
                <ProfileTalentRecentProjects posts={posts} />
                <ProfileTalentSavedJobs />
                <ProfileTalentProposals />
                <ProfileTalentClientHistory />
                <ProfileTalentSavedClients />
                <ProfileTalentDashboardEarnings />
                <ProfileTalentMessenger />
                <ProfileTalentTestimonials />
            </Box>
        </Container>
    );
};

export default TalentProfile;
