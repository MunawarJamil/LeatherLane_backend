import app from "./app.js";
import dotenv from "dotenv";
import { redisClient } from './config/redis.js';
import "./config/db.js"; // Ensure DB connects on server start
import pool from "./config/db.js";
dotenv.config();  

 
//   Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "LeatherLane Backend API is Running 🚀" });
});

 

//   Start Server
const PORT = process.env.PORT || 5000;
const start = async()=>{
try{
await pool.query('SELECT 1');
await redisClient.connect();
  //  Attach to app for global access
    app.locals.db = pool;
    app.locals.redis = redisClient;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})}catch(err){
console.error(err);
process.exit(1);
}
};
start();
