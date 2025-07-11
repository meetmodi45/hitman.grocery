import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { io } from "socket.io-client";
import axios from "../utils/axiosInstance";

const socket = io("https://hitman-grocery-backend.onrender.com", {
  withCredentials: true,
});

const UserChat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState(null);
  const chatEndRef = useRef(null);
  const senderIdRef = useRef(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // Fetch user ID on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://hitman-grocery-backend.onrender.com/api/users/me",
          {
            withCredentials: true,
          }
        );
        setSenderId(res.data._id);
        senderIdRef.current = res.data._id;
        socket.emit("join", res.data._id);
      } catch (err) {
        console.error("❌ Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  // Keep ref updated
  useEffect(() => {
    senderIdRef.current = senderId;
  }, [senderId]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Socket listener
  useEffect(() => {
    const handleMessage = (data) => {
      const currentId = senderIdRef.current;

      // Only add messages relevant to this user
      if (data.senderId === currentId || data.fromSeller) {
        setMessages((prev) => {
          // Prevent duplicate messages
          const isDuplicate = prev.some(
            (msg) =>
              msg.message === data.message &&
              msg.senderId === data.senderId &&
              msg.fromSeller === data.fromSeller
          );
          if (!isDuplicate) {
            // Show red dot only for seller messages when chat is closed
            if (data.fromSeller && !open) {
              setHasNewMessage(true);
            }
            return [...prev, data];
          }
          return prev;
        });
      }
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [open]);

  const sendMessage = () => {
    if (message.trim() && senderId) {
      const msgObj = {
        senderId,
        message,
        fromSeller: false,
      };

      console.log("📤 Sending message:", msgObj);

      // Send to socket
      socket.emit("sendMessage", msgObj);

      // Optimistic UI update
      setMessages((prev) => [...prev, msgObj]);
      setMessage("");

      // Save to database
      axios
        .post(
          `https://hitman-grocery-backend.onrender.com/api/chat/send`,
          msgObj,
          {
            withCredentials: true,
          }
        )
        .catch((err) => {
          console.error("❌ Failed to save message to DB:", err);
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const toggleChat = async () => {
    if (!open && senderId) {
      try {
        const res = await axios.get(
          `https://hitman-grocery-backend.onrender.com/api/chat/${senderId}`,
          { withCredentials: true }
        );

        setMessages([
          {
            message: "How can I help you?",
            fromSeller: true,
            senderId: "seller",
          },
          ...res.data,
        ]);
      } catch (err) {
        console.error("❌ Failed to load chat", err);
        setMessages([
          {
            message: "How can I help you?",
            fromSeller: true,
            senderId: "seller",
          },
        ]);
      }
    }

    // Clear the red dot when chat is opened
    if (!open) {
      setHasNewMessage(false);
    }
    setOpen(!open);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className="fixed bottom-5 right-5 z-50 bg-primary hover:bg-primary-dull text-white p-3 rounded-full shadow-lg transition"
        onClick={toggleChat}
      >
        <IoChatboxEllipsesOutline size={30} />

        {/* 🔴 Red Dot Overlay */}
        {hasNewMessage && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 rounded-full border-2 border-white"></span>
        )}
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-20 right-5 w-80 max-h-[60vh] bg-white shadow-xl border rounded-lg flex flex-col overflow-hidden z-50">
          <div className="bg-primary text-white px-4 py-2 font-semibold">
            Chat with Seller
          </div>

          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[70%] px-3 py-2 rounded-lg ${
                  msg.fromSeller
                    ? "bg-gray-200 text-gray-800 self-start mr-auto"
                    : "bg-primary text-white self-end ml-auto"
                }`}
              >
                {msg.message}
                <div className="text-xs opacity-70 mt-1">
                  {(() => {
                    const date = new Date(msg.createdAt || new Date());

                    // Format time (2:28 PM)
                    const timeStr = date.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    });

                    // Format date (7th July)
                    const day = date.getDate();
                    const monthStr = date.toLocaleString("default", {
                      month: "long",
                    });
                    const dayWithSuffix = `${day}${
                      ["th", "st", "nd", "rd"][
                        day % 100 > 10 && day % 100 < 20 ? 0 : day % 10
                      ] || "th"
                    }`;

                    return `${timeStr}, ${dayWithSuffix} ${monthStr}`;
                  })()}
                </div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          <div className="p-2 border-t flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-3 py-2 text-sm border rounded outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-primary text-white p-2 rounded hover:bg-primary-dull"
            >
              <FaPaperPlane size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserChat;
