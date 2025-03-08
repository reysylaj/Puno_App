import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const ProfileClientSkills = ({ skills = [] }) => {
    if (!skills || skills.length === 0) {
        return <Typography>No skills added yet.</Typography>;
    }

    return (
        <Box>
            <Typography variant="h6">Skills</Typography>
            <List>
                {skills.map((skill, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={skill} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ProfileClientSkills;
