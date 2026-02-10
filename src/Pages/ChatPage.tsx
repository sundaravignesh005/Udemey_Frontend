import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import "./ChatPage.css";
const BACKEND_URL = "http://localhost:8080";
let socket: Socket;
type Message = {
  senderId: string;
  senderName?: string;
  senderRole?: string;
  receiverId?: string;
  text: string;
  createdAt?: string;
  type?: string;
};
const ChatPage: React.FC = () => {
  // Logged-in User
  const currentUserId = localStorage.getItem("userId") || "";
  const currentUserName = localStorage.getItem("userName") || "User";
  const currentUserRole = localStorage.getItem("role") || "student";
  // Dynamic Instructor
  const [instructorId, setInstructorId] = useState<string>("");
  // Chat State
  const [roomId, setRoomId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const messagesRef = useRef<HTMLDivElement | null>(null);
  // Auto fetch instrotor id 
  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/chat/instructor`);
        console.log("🔍 Instructor API Response:", res.data);

        const extractedId =
          res.data?._id || res.data?.userId || res.data?.instructorId;

        if (extractedId) {
          setInstructorId(extractedId);
        } else {
          console.warn(" Instructor exists but ID property missing.");
        }
      } catch (err) {
        console.error("the Instructor fetch error:", err);
      }
    };

    fetchInstructor();
  }, []);

// socket connection 
     useEffect(() => {
    socket = io(BACKEND_URL, { transports: ["websocket"] });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("receiveMessage", ({ message }) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });
    socket.on("typing", ({ userName }) =>
      setTypingUser(`${userName} is typing...`)
    );
    socket.on("stopTyping", () => setTypingUser(""));

    return () => socket.disconnect();
  }, []);
  // Auto scroll
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }, 50);
  };
  const startPrivateChat = async () => {
    if (!currentUserId) {
      alert("Please login first.");
      return;
    }
    if (!instructorId) {
  console.warn(" Instructor still loading... retrying in 500ms");
  setTimeout(startPrivateChat, 500);
  return;
}
    const ids = [currentUserId, instructorId].sort();
    const rId = `private_${ids[0]}_${ids[1]}`;
    setRoomId(rId);
    // Ensure room exists
    await axios.post(`${BACKEND_URL}/chat/private`, {
      userA: currentUserId,
      userB: instructorId,
    });
    // Join room in sockets
    socket.emit("joinRoom", {
      roomId: rId,
      userId: currentUserId,
      userName: currentUserName,
    });
    // Load history
    const res = await axios.get(`${BACKEND_URL}/chat/${rId}`);
    setMessages(res.data?.messages || []);
    scrollToBottom();
    socket.emit("markRead", { roomId: rId, userId: currentUserId });
  };
  let typingTimeout: any;
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (!roomId) return;
    socket.emit("typing", { roomId, userName: currentUserName });
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("stopTyping", { roomId });
    }, 700);
  };
  // Send mesg
  const sendMessage = () => {
    if (!input.trim() || !roomId) return;
    const payload = {
      roomId,
      senderId: currentUserId,
      senderName: currentUserName,
      senderRole: currentUserRole,
      receiverId: instructorId,
      text: input.trim(),
      type: "text",
    };
    socket.emit("sendMessage", payload);
    setMessages((prev) => [
    ...prev,
      { ...payload, createdAt: new Date().toISOString() },
    ]);
    setInput("");
    scrollToBottom();
  };
  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Chat</h3>
        <button
       className="join-btn"
       onClick={startPrivateChat}
       disabled={!instructorId}
          style={{
    opacity: instructorId ? 1 : 0.5,
    cursor: instructorId ? "pointer" : "not-allowed",
  }}
>
  {instructorId ? "Message Instructor" : "Loading instructor..."}
</button>
        <div className="status">
          <p>Socket: {connected ? " Connected" : " Disconnected"}</p>
          <p>Room: {roomId || "No room joined"}</p>
        </div>
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <h4>{roomId ? "Instructor Chat" : "Select a chat"}</h4>
          <p className="typing">{typingUser}</p>
        </div>
        <div className="messages" ref={messagesRef}>
          {messages.map((msg, i) => {
            const isMe = msg.senderId === currentUserId;
            return (
              <div key={i} className={`msg ${isMe ? "me" : "them"}`}>
                          <div className="meta">
                  {msg.senderName} •{" "}
                     {new Date(msg.createdAt || "").toLocaleTimeString()}
                </div>
                <div className="text">{msg.text}</div>
              </div>
            );
          })}
        </div>
        <div className="chat-input">
          <input
            value={input}
            onChange={handleTyping}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
