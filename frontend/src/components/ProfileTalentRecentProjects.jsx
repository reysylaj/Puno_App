import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardMedia, CardActions, Button, Pagination, Avatar, Grid } from "@mui/material";
import "../styles/ProfileTalentRecentProjects.css";

const ITEMS_PER_PAGE = 3; // Number of posts per page

const ProfileTalentRecentProjects = ({ posts }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedPosts, setPaginatedPosts] = useState([]);

    useEffect(() => {
        updatePaginatedPosts(1);
    }, [posts]);

    // Update displayed posts based on the current page
    const updatePaginatedPosts = (page) => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setPaginatedPosts(posts.slice(startIndex, endIndex));
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        updatePaginatedPosts(value);
    };

    return (
        <Box className="recent-projects-container">
            <Typography variant="h5" className="recent-projects-title">Recent Projects</Typography>

            {paginatedPosts.length === 0 ? (
                <Typography>No recent projects yet.</Typography>
            ) : (
                <Grid container spacing={2} justifyContent="center">
                    {paginatedPosts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}> {/* 3 posts in a row */}
                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    {/* User Info */}
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={post.profilePicture} sx={{ marginRight: 1 }} />
                                        <Box>
                                            <Typography variant="h6">{post.user}</Typography>
                                            <Typography variant="caption" color="textSecondary">{post.date}</Typography>
                                        </Box>
                                    </Box>

                                    {/* Post Media */}
                                    {post.media && (
                                        <CardMedia
                                            component={post.media.includes("video") ? "video" : "img"}
                                            src={post.media}
                                            controls={post.media.includes("video")}
                                            alt="Project Media"
                                            height="140"
                                        />
                                    )}

                                    {/* Post Content */}
                                    <Typography className="post-text" dangerouslySetInnerHTML={{ __html: post.text.substring(0, 100) + "..." }} />
                                </CardContent>

                                {/* Post Actions */}
                                <CardActions>
                                    <Button size="small" color="primary">View</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Pagination */}
            <Pagination
                count={Math.ceil(posts.length / ITEMS_PER_PAGE)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
            />
        </Box>
    );
};

export default ProfileTalentRecentProjects;
