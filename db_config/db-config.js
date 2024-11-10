import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.MONGO_URL)


const db = mongoose.connection;

db.on("connected", () => {
    console.log("db is connected")
})

db.on('error', () => {
    console.log("error in db")
})

export default db;