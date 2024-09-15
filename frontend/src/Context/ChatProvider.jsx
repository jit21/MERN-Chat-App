import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // Initialize with `null`
    const [selectedChat, setSelectedChat] = useState(null); // Initialize with `null`
    const [chats, setChats] = useState([]);  // Initialize with an empty array
    const [notification,setNotfication]=useState([]);
    const navigate = useNavigate(); // renamed to `navigate` for clarity

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) {
            navigate("/"); // Ensure navigation happens if userInfo is null
        }
    }, [navigate]); // removed unnecessary history alias

    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats ,notification, setNotfication}}>
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
