import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import "./InstructorChatPage.css";

const BACKEND_URL = "http://localhost:8080";

type Message = {
  senderId: string;
  senderName?: string;
  senderRole?: string;
  receiverId?: string;
  text: string;
  createdAt?: string;
  type?: string;
};

type ChatListItem = {
  roomId: string;
  lastMessage?: Message;
  unreadCount: number;
  participants: string[];
};

const InstructorChatPage: React.FC = () => {
  const instructorId = localStorage.getItem("userId") || "";
  const instructorName = localStorage.getItem("userName") || "Instructor";

  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typingUser, setTypingUser] = useState("");

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // INIT SOCKET
  useEffect(() => {
    const socket = io(BACKEND_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("receiveMessage", ({ message }) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });

    // ⭐ NOTIFICATION: Listen for new messages from students
    socket.on("newMessageNotification", ({ roomId, senderName, message: msgText }) => {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(`New message from ${senderName}`, {
          body: msgText,
          icon: "/vite.svg",
        });
      }
      loadChatList();
    });

    socket.on("typing", ({ userName }) => {
      setTypingUser(`${userName} is typing...`);
    });

    socket.on("stopTyping", () => {
      setTypingUser("");
    });

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  // LOAD CHAT LIST
  useEffect(() => {
    loadChatList();
    
    // Refresh chat list every 5 seconds to catch new messages
    const interval = setInterval(loadChatList, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadChatList = async () => {
    const res = await axios.get(`${BACKEND_URL}/chat/list/${instructorId}`);
    setChatList(res.data);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesRef.current)
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, 50);
  };

  // OPEN CHAT FROM LIST
  const openChat = async (room: string) => {
    setRoomId(room);

    socketRef.current?.emit("joinRoom", {
      roomId: room,
      userId: instructorId,
      userName: instructorName,
    });

    const res = await axios.get(`${BACKEND_URL}/chat/${room}`);
    setMessages(res.data?.messages || []);
    scrollToBottom();

    // mark messages as read
    socketRef.current?.emit("markRead", { roomId: room, userId: instructorId });

    loadChatList();
  };

  // SEND MESSAGE
  const sendMessage = () => {
    if (!input.trim() || !roomId) return;

    const payload = {
      roomId,
      senderId: instructorId,
      senderName: instructorName,
      senderRole: "instructor",
      receiverId: roomId.split("_")[1], // student ID
      text: input,
    };

    socketRef.current?.emit("sendMessage", payload);

    setMessages((prev) => [
      ...prev,
      { ...payload, createdAt: new Date().toISOString() },
    ]);

    setInput("");
    scrollToBottom();
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    socketRef.current?.emit("typing", { roomId, userName: instructorName });

    setTimeout(() => {
      socketRef.current?.emit("stopTyping", { roomId });
    }, 800);
  };

  return (
    <div className="instructor-chat-container">

      {/* LEFT SIDEBAR - CHAT LIST */}
      <div className="chat-list">
        <h3 className="list-title">Messages</h3>

        {chatList.length === 0 && (
          <p className="no-chats">No messages yet.</p>
        )}

        {chatList.map((chat, i) => {
          const studentId =
            chat.participants.find((p) => p !== instructorId) || "Student";

          return (
            <div
              key={i}
              className={`chat-list-item ${
                chat.roomId === roomId ? "active" : ""
              }`}
              onClick={() => openChat(chat.roomId)}
            >
              <div className="chat-info">
                <p className="chat-user">Student: {studentId}</p>
                <p className="chat-preview">
                  {chat.lastMessage?.text?.slice(0, 25) || "No messages"}
                </p>
              </div>

              {chat.unreadCount > 0 && (
                <span className="unread-badge">{chat.unreadCount}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* RIGHT SECTION - MESSAGE WINDOW */}
      <div className="chat-window">
        {roomId ? (
          <>
            <div className="chat-header">
              <h4>Chat with Student</h4>
              <p className="typing">{typingUser}</p>
            </div>

            <div className="messages" ref={messagesRef}>
              {messages.map((msg, i) => {
                const isMe = msg.senderId === instructorId;

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
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="empty-chat">
            <h3>Select a conversation</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorChatPage;
