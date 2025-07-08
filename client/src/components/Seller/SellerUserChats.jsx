import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { FaArrowLeft } from "react-icons/fa";

const socket = io("http://localhost:4000", {
  withCredentials: true,
});

const SellerUserChats = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [unreadMap, setUnreadMap] = useState({});
  const [openedChats, setOpenedChats] = useState({}); // Tracks which chats have been opened
  const chatEndRef = useRef(null);
  const selectedUserRef = useRef(null);

  useEffect(() => {
    socket.emit("join", "seller");

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/chat/all-users",
          { withCredentials: true }
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching user list", err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser?._id) {
      selectedUserRef.current = selectedUser;

      const fetchMessages = async () => {
        try {
          const res = await axios.get(
            `http://localhost:4000/api/chat/${selectedUser._id}`,
            { withCredentials: true }
          );
          setMessages(res.data);

          // Mark chat as opened and clear unread status
          setOpenedChats((prev) => ({ ...prev, [selectedUser._id]: true }));
          setUnreadMap((prev) => ({ ...prev, [selectedUser._id]: false }));
        } catch (err) {
          console.error("Error fetching messages", err);
        }
      };

      fetchMessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    // Scroll to bottom when messages change
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleMessage = (msg) => {
      const selected = selectedUserRef.current;

      // Skip if duplicate
      const isDuplicate = messages.some(
        (m) =>
          m._id === msg._id ||
          (m.message === msg.message &&
            m.senderId === msg.senderId &&
            new Date(m.createdAt).getTime() ===
              new Date(msg.createdAt).getTime())
      );

      if (isDuplicate) return;

      // If message is from currently selected user → show in chat
      if (selected && msg.senderId === selected._id) {
        setMessages((prev) => [...prev, msg]);
      } else {
        // Mark as unread if chat hasn't been opened or if it's not the current chat
        setUnreadMap((prev) => ({ ...prev, [msg.senderId]: true }));
      }

      // Add new user if not present
      setUsers((prevUsers) => {
        const exists = prevUsers.some((u) => u._id === msg.senderId);
        if (!exists) {
          return [
            ...prevUsers,
            {
              _id: msg.senderId,
              name: msg.senderName || "New User",
              email: msg.senderEmail || "",
            },
          ];
        }
        return prevUsers;
      });
    };

    socket.on("receiveMessage", handleMessage);
    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim() || !selectedUser) return;

    const msgObj = {
      senderId: selectedUser._id,
      message,
      fromSeller: true,
    };

    socket.emit("sendMessage", msgObj);
    setMessages((prev) => [...prev, msgObj]);
    setMessage("");

    axios
      .post("http://localhost:4000/api/chat/send", msgObj, {
        withCredentials: true,
      })
      .catch((err) => console.error("Failed to save message:", err));
  };

  const goBack = () => {
    setSelectedUser(null);
    selectedUserRef.current = null;
  };

  return (
    <div className="bg-white p-4 rounded shadow h-[85vh] max-w-6xl mx-auto flex flex-col sm:flex-row gap-4">
      {/* User List */}
      <div
        className={`sm:w-1/3 w-full sm:block ${
          selectedUser ? "hidden sm:block" : "block"
        } overflow-y-auto border-r sm:pr-4`}
      >
        <h2 className="text-lg font-semibold mb-3 text-primary-dull">
          User Chats
        </h2>
        {users.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No users have started a chat yet.
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className={`relative border border-gray-300 p-2 cursor-pointer rounded mb-2 flex items-center justify-between ${
                selectedUser?._id === user._id
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelectedUser(user);
                selectedUserRef.current = user;
              }}
            >
              <span>{user.name || user.email}</span>
              {/* Show red dot if unread and either:
                  - Chat has never been opened, OR
                  - It's not the currently selected chat */}
              {unreadMap[user._id] &&
                (!openedChats[user._id] || selectedUser?._id !== user._id) && (
                  <span className="ml-2 w-3 h-3 bg-red-600 rounded-full"></span>
                )}
            </div>
          ))
        )}
      </div>

      {/* Chat Section */}
      <div
        className={`flex-1 w-full sm:w-2/3 flex flex-col h-full ${
          selectedUser ? "block" : "hidden sm:block"
        }`}
      >
        {selectedUser && (
          <div className="sm:hidden flex items-center gap-2 mb-2">
            <button
              onClick={goBack}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <FaArrowLeft />
              Back to Users
            </button>
            <span className="text-primary-dull font-medium text-base">
              {selectedUser.name || selectedUser.email}
            </span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto border rounded p-3 space-y-2 text-sm max-h-[60vh] min-h-[400px]">
          {selectedUser ? (
            <div className="flex flex-col space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={msg._id || idx}
                  className={`flex ${
                    msg.fromSeller ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-lg break-words ${
                      msg.fromSeller
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.message}
                    <div className="text-xs opacity-70 mt-1">
                      <div className="text-xs opacity-70 mt-1">
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
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          ) : (
            <p className="text-gray-400 text-center mt-10">
              Select a user to view messages
            </p>
          )}
        </div>

        {selectedUser && (
          <div className="mt-3 flex items-center gap-2 border-t pt-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dull transition-colors"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerUserChats;
