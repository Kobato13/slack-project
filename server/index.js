const io = require("socket.io")(3100, {
  cors: {
    origin: ["http://localhost:3000"],
  },
})

io.on("connection", socket => {
  console.log(socket.id)
  socket.on('send-message', (chatMessage) => {
    io.emit('receive-message', chatMessage)
    console.log(chatMessage)
  })
})