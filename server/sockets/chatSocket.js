let ioInstance = null;

export const initSocket = (io) => {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    // Join room: seller joins "seller" room, users join their userId room
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`👤 User/Seller ${userId} joined room: ${userId}`);

      // Special handling for seller
      if (userId === "seller") {
        socket.join("seller");
        console.log("🛒 Seller joined seller room");
      }
    });

    // Receive and forward message
    socket.on("sendMessage", (data) => {
      const { senderId, message, fromSeller } = data;

      console.log("📨 Socket received message:", data);

      // Forward to correct recipient
      if (fromSeller) {
        // Seller sending to a specific user
        console.log(`📤 Seller sending to user ${senderId}`);
        io.to(senderId).emit("receiveMessage", data);
      } else {
        // User sending to seller
        console.log(`📤 User ${senderId} sending to seller`);
        io.to("seller").emit("receiveMessage", data);
        // Also send back to the user who sent it (for UI consistency)
        io.to(senderId).emit("receiveMessage", data);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔌 Socket disconnected:", socket.id);
    });

    socket.on("error", (error) => {
      console.error("❌ Socket error:", error);
    });
  });
};
