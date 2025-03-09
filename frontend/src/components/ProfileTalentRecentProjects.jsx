import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardMedia, CardActions, Button, Pagination, Avatar, Grid } from "@mui/material";
import "../styles/ProfileTalentRecentProjects.css";

const ITEMS_PER_PAGE = 3;

const ProfileTalentRecentProjects = ({ posts = [] }) => {  // ✅ Ensure `posts` is always an array
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedPosts, setPaginatedPosts] = useState([]);

    useEffect(() => {
        updatePaginatedPosts(1);
    }, [posts]);

    const updatePaginatedPosts = (page) => {
        if (!posts || posts.length === 0) {
            setPaginatedPosts([]);
            return;
        }
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
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={post.profilePicture || "/default-avatar.png"} sx={{ marginRight: 1 }} />
                                        <Box>
                                            <Typography variant="h6">{post.user || "Unknown User"}</Typography>
                                            <Typography variant="caption" color="textSecondary">{post.date || "No Date"}</Typography>
                                        </Box>
                                    </Box>

                                    {post.media && (
                                        <CardMedia
                                            component={post.media.includes("video") ? "video" : "img"}
                                            src={post.media}
                                            controls={post.media.includes("video")}
                                            alt="Project Media"
                                            height="140"
                                        />
                                    )}

                                    <Typography className="post-text" dangerouslySetInnerHTML={{ __html: post.text ? post.text.substring(0, 100) + "..." : "No content available" }} />
                                </CardContent>

                                <CardActions>
                                    <Button size="small" color="primary">View</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Pagination
                count={Math.ceil((posts.length || 1) / ITEMS_PER_PAGE)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
            />
        </Box>
    );
};

export default ProfileTalentRecentProjects;
