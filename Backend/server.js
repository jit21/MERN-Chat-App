const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const connectDB=require("./config/db.js")
const app=express();
const userRoutes=require('./Routes/userRoutes.js');
const chatRoutes=require("./Routes/chatroutes.js");
const messageRoutes=require("./Routes/messageRoutes.js")
const path=require("path")
const cors =require('cors');
app.use(cors());

const {notFound, errorHandler} =require("./middleware/errorMiddleware.js")

dotenv.config({path:'../.env'});
connectDB();
app.use(express.json());
app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);
app.use('/api/message',messageRoutes);

//......................................................Deployment of the Project.............................../
console.log(__dirname);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    });
}




///.....................................................Deployment of the project...............................//
app.use(notFound)
app.use(errorHandler)

PORT=process.env.PORT || 4000;

const server=app.listen(PORT,()=>{
    console.log(`server is running on port number ${PORT}`);
})
app.get('/',(req,res)=>{
    res.send("Api is running");
})
const io=require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:'*',
    }
});

io.on("connection",(socket)=>{
    console.log("connected to socket.io");
    socket.on('setup',(userData)=>{
    socket.join(userData._id);
    console.log(userData._id);
    
    socket.emit("connected");

    });
    socket.on("join chat",(room)=>{
      socket.join(room)
      console.log("User join room :"+room);
      
    })
    socket.on("typing",(room)=>{
        socket.in(room).emit("typing");
    })
    socket.on("stop typing",(room)=>{
        socket.in(room).emit("stop typing");
    })

    socket.on("new message",(newMessageRecived)=>{
        let chat =newMessageRecived.chat;
        if(!chat.users) return console.log("chat.users not defined");
        chat.users.forEach(user=>{
            if(user._id===newMessageRecived.sender._id){
                return;
            }
            socket.in(user._id).emit("message recived",newMessageRecived);
        })
        

    })
    socket.off("setup",()=>{
        console.log("user disconnected");
        socket.leave(userData._id);
    })


    

})