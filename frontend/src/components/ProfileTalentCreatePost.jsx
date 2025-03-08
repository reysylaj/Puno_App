import { useState } from "react";
import { Box, Avatar, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "../styles/ProfileTalentCreatePost.css";

const ProfileTalentCreatePost = ({ addPost }) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
        name: "John Doe",
        profilePicture: "/default-avatar.png",
    };

    const [open, setOpen] = useState(false);
    const [postContent, setPostContent] = useState("");
    const [media, setMedia] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setPostContent("");
        setMedia(null);
        setOpen(false);
    };

    // Handle post submission
    const handlePost = () => {
        if (!postContent.trim()) return;

        const newPost = {
            id: Date.now(),
            user: storedUser.name,
            profilePicture: storedUser.profilePicture,
            date: new Date().toLocaleString(),
            text: postContent,
            media: media, // Image or Video
        };

        // Get existing posts from localStorage
        const existingPosts = JSON.parse(localStorage.getItem("talentPosts")) || [];
        const updatedPosts = [newPost, ...existingPosts];
        localStorage.setItem("talentPosts", JSON.stringify(updatedPosts));

        // Update recent projects instantly
        addPost(newPost);

        handleClose();
    };

    // Handle image/video upload
    const handleMediaUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setMedia(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box className="create-post-container">
            {/* Post Input Box */}
            <Box className="post-input-box" onClick={handleOpen}>
                <Avatar src={storedUser.profilePicture} className="post-avatar" />
                <Box className="post-text-field">Create a post...</Box>
            </Box>

            {/* Action Buttons */}
            <Box className="post-actions">
                <Button startIcon={<ImageIcon />} className="post-action-button">Photo</Button>
                <Button startIcon={<VideoLibraryIcon />} className="post-action-button">Video</Button>
            </Box>

            {/* Post Modal */}
            <Dialog open={open} onClose={handleClose} className="post-dialog" maxWidth="md" fullWidth>
                <DialogTitle>
                    <Box className="post-header">
                        <Avatar src={storedUser.profilePicture} className="post-modal-avatar" />
                        <span>{storedUser.name}</span>
                        <IconButton className="close-button" onClick={handleClose}><CloseIcon /></IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {/* Quill Editor for Rich Text */}
                    <ReactQuill
                        value={postContent}
                        onChange={setPostContent}
                        placeholder="What do you want to talk about?"
                    />

                    {/* Media Upload */}
                    <input type="file" accept="image/*,video/*" onChange={handleMediaUpload} />
                    {media && (
                        <Box className="media-preview">
                            {media.includes("video") ? (
                                <video src={media} controls width="100%" />
                            ) : (
                                <img src={media} alt="Uploaded content" width="100%" />
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePost} className="post-submit-button">Post</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfileTalentCreatePost;
