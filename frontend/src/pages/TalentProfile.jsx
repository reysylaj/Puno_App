import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
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
import "../styles/TalentProfile.css";

const TalentProfile = () => {
    const [user, setUser] = useState(null);
    const [recentProjects, setRecentProjects] = useState([]);

    useEffect(() => {
        // ✅ Get the user from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            console.log("✅ Loaded User Data in TalentProfile:", parsedUser);
        } else {
            console.error("❌ No user data found in localStorage.");
        }

        // ✅ Load recent projects from localStorage
        const storedProjects = JSON.parse(localStorage.getItem("recentProjects")) || [];
        setRecentProjects(storedProjects);
        console.log("✅ Loaded Recent Projects:", storedProjects);
    }, []);

    // ✅ Define `addPost` function to add a new project
    const addPost = (newPost) => {
        const updatedProjects = [newPost, ...recentProjects]; // Add new post to the beginning
        setRecentProjects(updatedProjects);
        localStorage.setItem("recentProjects", JSON.stringify(updatedProjects)); // ✅ Save to localStorage
        console.log("✅ New Post Added:", newPost);
    };

    if (!user) {
        return <Typography variant="h4">Loading Profile...</Typography>;
    }

    return (
        <Box className="profile-container">
            <ProfileTalentHeader user={user} />
            <ProfileTalentSkills />
            <ProfileTalentCreatePost addPost={addPost} /> {/* ✅ Pass `addPost` correctly */}
            <ProfileTalentRecentProjects posts={recentProjects} /> {/* ✅ Pass `recentProjects` instead of `posts` */}
            <ProfileTalentSavedJobs />
            <ProfileTalentProposals />
            <ProfileTalentClientHistory />
            <ProfileTalentSavedClients />
            <ProfileTalentDashboardEarnings />
            <ProfileTalentMessenger />
            <ProfileTalentTestimonials />
        </Box>
    );
};

export default TalentProfile;
