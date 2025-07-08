let ioInstance = null;

export const initSocket = (io) => {
  ioInstance = io;

  io.on("connection", (socket) => {
    // console.log("🟢 Socket connected:", socket.id);

    // 1️⃣ Join room: seller joins "seller", users join their userId
    socket.on("join", (userId) => {
      socket.join(userId); // Each user has a private room
      // if (userId === "seller") {
      //   //console.log("🛒 Seller joined room");
      // } else {
      //   //console.log(`👤 User ${userId} joined their private room`);
      // }
    });

    // 2️⃣ Receive and forward message
    socket.on("sendMessage", (data) => {
      const { senderId, message, fromSeller } = data;

      // Save to DB (optional here or via REST API — depends on flow)
      // Forward to correct recipient:
      if (fromSeller) {
        // Seller sending to a user
        io.to(senderId).emit("receiveMessage", data);
      } else {
        // User sending to seller
        io.to("seller").emit("receiveMessage", data);
        io.to(senderId).emit("receiveMessage", data); // Echo back to user
      }
    });

    socket.on("disconnect", () => {
      //console.log("🔌 Socket disconnected:", socket.id);
    });
  });
};
