import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent, IconButton, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { Link } from "react-router-dom";
import "../styles/RegisteringAsTalent.css";

const RegisteringAsTalent = () => {
    const [infoText, setInfoText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const handleInfoClick = (text) => {
        setInfoText(text);
    };

    const handleCardClick = (category) => {
        setSelectedCategory(category);
    };

    // Function to navigate to registration page with selected category
    const handleRegister = () => {
        if (selectedCategory) {
            navigate("/talent-registration", { state: { category: selectedCategory } });
        } else {
            alert("Ju lutem zgjidhni një kategori para se të vazhdoni.");
        }
    };

    return (
        <Box className="register-container">
            {/* Title */}
            <Typography variant="h4" className="register-title">
                JU ZGJODHET TE REGJISTROHENI SI TALENT
            </Typography>

            {/* Description */}
            <Typography variant="body1" className="register-description">
                Jeni te lutur te zgjidhni kategorine qe ndiheni te perfshire. Klikoni{" "}
                <Tooltip title="Kliko për më shumë info">
                    <HelpOutlineIcon className="info-icon" />
                </Tooltip>{" "}
                per tu informuar me shume.
            </Typography>

            {/* Cards Container */}
            <Box className="cards-container">
                {/* First Card - Student */}
                <Card
                    className={`register-card ${selectedCategory === "Jam student dhe kerkoj pune internship ne pozicione te lira ose ne fushën ku kam njohuri" ? "selected-card" : ""}`}
                    onClick={() => handleCardClick("Jam student dhe kerkoj pune internship ne pozicione te lira ose ne fushën ku kam njohuri")}
                >
                    <CardContent>
                        <Typography variant="h6" className="card-title">Talent/</Typography>
                        <Box className="icon-container">
                            <SchoolIcon className="card-icon" />
                        </Box>
                        <Typography variant="body2" className="card-text">
                            Jam student dhe kerkoj pune internship ne pozicione te lira ose ne fushën ku kam njohuri
                        </Typography>
                        <Box className="card-bottom">
                            <IconButton onClick={() => handleInfoClick("Ky punëtor është student dhe kërkon internship.")} className="info-button">
                                <HelpOutlineIcon className="info-icon" />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>

                {/* Second Card - Side Jobs */}
                <Card
                    className={`register-card ${selectedCategory === "Kerkoj nje pune te dyte/ projekte ne njohurite qe zoteroj" ? "selected-card" : ""}`}
                    onClick={() => handleCardClick("Kerkoj nje pune te dyte/ projekte ne njohurite qe zoteroj")}
                >
                    <CardContent>
                        <Typography variant="h6" className="card-title">Talent/</Typography>
                        <Box className="icon-container">
                            <WorkIcon className="card-icon" />
                        </Box>
                        <Typography variant="body2" className="card-text">
                            Kerkoj nje pune te dyte/ projekte ne njohurite qe zoteroj
                        </Typography>
                        <Box className="card-bottom">
                            <IconButton onClick={() => handleInfoClick("Ky punëtor ka njohuri dhe kërkon punë të dytë.")} className="info-button">
                                <HelpOutlineIcon className="info-icon" />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>

                {/* Third Card - Freelancer Payments */}
                <Card
                    className={`register-card ${selectedCategory === "Kam ndjekës dhe klientët e mi, por dua të kalohet pagesa nga 1 platformë online" ? "selected-card" : ""}`}
                    onClick={() => handleCardClick("Kam ndjekës dhe klientët e mi, por dua të kalohet pagesa nga 1 platformë online")}
                >
                    <CardContent>
                        <Typography variant="h6" className="card-title">Talent/</Typography>
                        <Box className="icon-container">
                            <PaymentIcon className="card-icon" />
                        </Box>
                        <Typography variant="body2" className="card-text">
                            Kam ndjekës dhe klientët e mi, por dua të kalohet pagesa nga 1 platformë online
                        </Typography>
                        <Box className="card-bottom">
                            <IconButton onClick={() => handleInfoClick("Ky punëtor ka klientë por dëshiron pagesa të menaxhuara.")} className="info-button">
                                <HelpOutlineIcon className="info-icon" />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>

                {/* Fourth Card - Urgent Jobs */}
                <Card
                    className={`register-card ${selectedCategory === "Jam i papunë dhe jo student, dhe kerkoj pune urgjente ne pozicione te lira ose ne fushën ku kam njohuri" ? "selected-card" : ""}`}
                    onClick={() => handleCardClick("Jam i papunë dhe jo student, dhe kerkoj pune urgjente ne pozicione te lira ose ne fushën ku kam njohuri")}
                >
                    <CardContent>
                        <Typography variant="h6" className="card-title">Talent/</Typography>
                        <Box className="icon-container">
                            <PersonOffIcon className="card-icon" />
                        </Box>
                        <Typography variant="body2" className="card-text">
                            Jam i papunë dhe jo student, dhe kerkoj pune urgjente ne pozicione te lira ose ne fushën ku kam njohuri
                        </Typography>
                        <Box className="card-bottom">
                            <IconButton onClick={() => handleInfoClick("Ky punëtor është i papunë dhe kërkon punë urgjente.")} className="info-button">
                                <HelpOutlineIcon className="info-icon" />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Info Box */}
            {infoText && (
                <Box className="info-box">
                    <Typography variant="body1">{infoText}</Typography>
                </Box>
            )}

            {/* Register Button */}
            <Button className="register-button" onClick={handleRegister}>
                REGJISTROHU
            </Button>

            {/* Login Link */}
            <Typography variant="body1" className="login-text">
                Nese keni nje llogari me ne jeni te lutur te beni login{" "}
                <Link to="/login" className="login-link">
                    ketu
                </Link>
                .
            </Typography>
        </Box>
    );
};

export default RegisteringAsTalent;
