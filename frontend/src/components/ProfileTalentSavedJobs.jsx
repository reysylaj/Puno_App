import { useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "../styles/ProfileTalentSavedJobs.css";

const ProfileTalentSavedJobs = () => {
    const [savedJobs] = useState([
        {
            id: 1,
            title: "Frontend Developer (React)",
            company: "Tech Solutions",
            location: "Remote",
            salary: "$70k - $90k",
            link: "https://example.com/job1",
        },
        {
            id: 2,
            title: "Full Stack Engineer",
            company: "InnovateHub",
            location: "New York, USA",
            salary: "$80k - $100k",
            link: "https://example.com/job2",
        },
        {
            id: 3,
            title: "UI/UX Designer",
            company: "Creative Studio",
            location: "London, UK",
            salary: "$60k - $85k",
            link: "https://example.com/job3",
        },
    ]);

    return (
        <Box className="saved-jobs-container">
            <Typography variant="h6" className="saved-jobs-title">
                ⭐ Saved Job Posts
            </Typography>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={20}
                className="saved-jobs-swiper"
            >
                {savedJobs.map((job) => (
                    <SwiperSlide key={job.id}>
                        <Card className="saved-job-card">
                            <CardContent>
                                <Typography variant="h6">{job.title}</Typography>
                                <Typography variant="body2" className="job-company">
                                    {job.company}
                                </Typography>
                                <Typography variant="body2" className="job-location">
                                    {job.location}
                                </Typography>
                                <Typography variant="body2" className="job-salary">
                                    {job.salary}
                                </Typography>
                                <Button
                                    className="view-job-button"
                                    onClick={() => window.open(job.link, "_blank")}
                                >
                                    View Job
                                </Button>
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default ProfileTalentSavedJobs;
