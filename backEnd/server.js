const express = require('express')
const app = express()
const server = require("http").Server(app)
const io = require('socket.io')(server)
const {v4: uuidV4 } = require('uuid')
// import { EventEmitter } from 'node:events';
// const myEmitter = new EventEmitter();



app.use(express.static('public'))

app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/', (req, res)=> {
    console.log("Hello")
    // res.redirect(`/${uuidV4()}`)
    res.send({Url : `/${uuidV4()}`})
})

// app.get('/:room',(req, res)=>{
//     res.render('room', {roomId: req.params.room })
// })

io.on('connection', (socket) => {
    console.log("Connected")
    socket.on('join-room', (roomId, userId) => {
        console.log("Joined room")
        socket.join(roomId);

        // Broadcasting 'user-connected' event to all clients in the room except the sender
        socket.to(roomId).emit('user-connected', userId);

        socket.on('disconnect', () => {
            // Broadcasting 'user-disconnected' event to all clients in the room
            io.to(roomId).emit('user-disconnected', userId);
        });
    });
});

// server.listen(3000)

app.listen(3000, 
    () => console.log("running on http:localhost:3000") 
    )