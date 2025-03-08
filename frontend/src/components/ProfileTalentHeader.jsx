import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";


const ProfileTalentHeader = ({ user }) => {
    if (!user) {
        console.error("ProfileTalentHeader received null user data.");
        return <Typography>Error loading user data.</Typography>;
    }

    console.log("ProfileTalentHeader received user:", user); // ✅ Debugging log

    return (
        <Box className="profile-header">
            <Box className="cover-container">
                <img src={user.coverImage || "/default-cover.jpg"} alt="Cover" className="cover-image" />
            </Box>

            <Box className="profile-info">
                <Avatar src={user.profilePicture || "/default-avatar.png"} className="profile-avatar" />
                <Box className="details-container">
                    <Typography variant="h4">{user.name} {user.surname}</Typography>
                    <Typography variant="h6" className="role-text">{user.role}</Typography>
                    <Typography variant="body2" className="job-role">{user.jobRole}</Typography>
                    <Typography variant="body2" className="job-category">{user.jobSeekingCategory}</Typography>
                </Box>
            </Box>

            <Box className="jobs-confirmed">
                <Typography variant="h6">Total Jobs Confirmed: {user.jobsConfirmed || 0}</Typography>
            </Box>
        </Box>
    );
};

export default ProfileTalentHeader;
