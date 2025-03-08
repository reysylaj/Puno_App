import { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText, Avatar, Button, TextField } from "@mui/material";
import "../styles/ProfileTalentMessenger.css";

const ProfileTalentMessenger = () => {
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState("");

    // Dummy Messages Data (Replace with API later)
    useEffect(() => {
        const sampleMessages = [
            { id: 1, client: "TechCorp", avatar: "https://via.placeholder.com/40", messages: [{ text: "Hi, we need a frontend developer!", sender: "client" }, { text: "Sure, I’m interested!", sender: "talent" }] },
            { id: 2, client: "FinBank", avatar: "https://via.placeholder.com/40", messages: [{ text: "Are you available for a new project?", sender: "client" }] },
            { id: 3, client: "Startup Hub", avatar: "https://via.placeholder.com/40", messages: [{ text: "Can you review our UI/UX?", sender: "client" }, { text: "Yes, let’s discuss!", sender: "talent" }] },
        ];
        setMessages(sampleMessages);
    }, []);

    // Handle chat selection
    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
    };

    // Handle sending message
    const handleSendMessage = () => {
        if (messageInput.trim() === "") return;

        const updatedMessages = messages.map(chat =>
            chat.id === selectedChat.id
                ? { ...chat, messages: [...chat.messages, { text: messageInput, sender: "talent" }] }
                : chat
        );

        setMessages(updatedMessages);
        setMessageInput("");
    };

    return (
        <Box className="messenger-container">
            <Typography variant="h5" className="messenger-title">Messages</Typography>

            <Box className="messenger-box">
                {/* Sidebar with Clients */}
                <Box className="client-list">
                    <Typography variant="h6" className="client-title">Clients</Typography>
                    <List>
                        {messages.map(chat => (
                            <ListItem key={chat.id} button={Boolean(true)} onClick={() => handleSelectChat(chat)}>

                                <Avatar src={chat.avatar} alt={chat.client} />
                                <ListItemText primary={chat.client} />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Chat Window */}
                <Box className="chat-window">
                    {selectedChat ? (
                        <>
                            <Typography variant="h6" className="chat-header">{selectedChat.client}</Typography>
                            <Box className="chat-messages">
                                {selectedChat.messages.map((msg, index) => (
                                    <Typography key={index} className={`message ${msg.sender}`}>
                                        {msg.text}
                                    </Typography>
                                ))}
                            </Box>
                            <Box className="chat-input">
                                <TextField
                                    variant="outlined"
                                    placeholder="Type your message..."
                                    fullWidth
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                />
                                <Button className="send-button" onClick={handleSendMessage}>Send</Button>
                            </Box>
                        </>
                    ) : (
                        <Typography className="select-chat-text">Select a client to start messaging</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ProfileTalentMessenger;
