const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const {MONGO_URL} = process.env;
;
const authRoute = require("./routes/AuthRoute.js");

const {connectToSocket} = require("./controllers/SocketManager.js");
const { createServer } = require("http");
const {Server} = require("socket.io");
const server = createServer(app);
const io = connectToSocket(server)


require("dotenv").config();
const PORT = process.env.PORT || 4000;
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use(cookieParser());

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   res.header('Access-Control-Allow-Credentials', 'true');
   if (req.method === 'OPTIONS') {
     return res.status(200).end();
   }
 
   next();
 });

 app.use("/",authRoute);
//  app.use("api/v1/users",authRoute);


 const start = async ()=>{

  await mongoose.connect(MONGO_URL)
  .then(()=>console.log("connected to DB"))
  .catch((err)=>console.error(err));

  server.listen(PORT,()=>{
   console.log(`server is listening on port ${PORT}`);
})
 }
 start();













// app.use(cors([{
//    origin:["http://localhost:5173"],
//    methods: ["GET", "POST", "PUT", "DELETE"],
//    credentials: true,
// }])
// );