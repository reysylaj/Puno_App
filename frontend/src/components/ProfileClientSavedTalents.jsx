import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/ProfileClientSavedTalents.css";

const ProfileClientSavedTalents = () => {
    // Load saved talents from LocalStorage
    const [savedTalents, setSavedTalents] = useState([]);

    useEffect(() => {
        const storedTalents = JSON.parse(localStorage.getItem("savedTalents")) || [];
        setSavedTalents(storedTalents);
    }, []);

    // Remove talent from saved list
    const handleRemove = (id) => {
        const updatedTalents = savedTalents.filter(talent => talent.id !== id);
        setSavedTalents(updatedTalents);
        localStorage.setItem("savedTalents", JSON.stringify(updatedTalents));
    };

    // Slider settings
    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } }
        ]
    };

    return (
        <Box className="saved-talents-container">
            <Typography variant="h5" className="saved-talents-title">Saved Talents</Typography>

            {savedTalents.length === 0 ? (
                <Typography className="no-talents">No saved talents yet.</Typography>
            ) : (
                <Slider {...sliderSettings}>
                    {savedTalents.map((talent) => (
                        <Card key={talent.id} className="talent-card">
                            <CardMedia component="img" image={talent.profilePicture || "/default-avatar.png"} alt={talent.name} className="talent-image" />
                            <CardContent>
                                <Typography variant="h6">{talent.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{talent.role}</Typography>
                                <Button variant="contained" size="small" href={talent.profileLink} target="_blank" className="view-profile-btn">
                                    View Profile
                                </Button>
                                <IconButton onClick={() => handleRemove(talent.id)} className="delete-btn">
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    ))}
                </Slider>
            )}
        </Box>
    );
};

export default ProfileClientSavedTalents;
