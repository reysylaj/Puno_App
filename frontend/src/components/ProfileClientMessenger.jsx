import { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Avatar, TextField, Button } from "@mui/material";
import "../styles/ProfileClientMessenger.css";

const ProfileClientMessenger = () => {
    const [conversations, setConversations] = useState([
        { id: 1, name: "John Doe", lastMessage: "Looking forward to working with you!", avatar: "/default-avatar.png" },
        { id: 2, name: "Jane Smith", lastMessage: "When can we discuss the details?", avatar: "/default-avatar.png" },
    ]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
    };

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        console.log("Message sent to", selectedChat.name, "=>", newMessage);
        setNewMessage("");
    };

    return (
        <Box className="messenger-container">
            <Box className="chat-sidebar">
                <Typography variant="h6">Messages</Typography>
                <List>
                    {conversations.map((chat) => (
                        <ListItem key={chat.id} button onClick={() => handleSelectChat(chat)}>
                            <Avatar src={chat.avatar} />
                            <ListItemText primary={chat.name} secondary={chat.lastMessage} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box className="chat-window">
                {selectedChat ? (
                    <>
                        <Typography variant="h6">Chat with {selectedChat.name}</Typography>
                        <Box className="message-box">
                            <TextField
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                fullWidth
                                placeholder="Type your message..."
                                className="message-input"
                            />
                            <Button onClick={handleSendMessage} className="send-button">Send</Button>
                        </Box>
                    </>
                ) : (
                    <Typography className="no-chat">Select a conversation to start chatting</Typography>
                )}
            </Box>
        </Box>
    );
};

export default ProfileClientMessenger;

