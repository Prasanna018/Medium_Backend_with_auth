import mongoose from "mongoose";
mongoose.connect("mongodb+srv://prasannagaikwad0018:2doX0XmcSRolWdrI@cluster0.zemrf.mongodb.net/Medium")


const db = mongoose.connection;

db.on("connected", () => {
    console.log("db is connected")
})

db.on('error', () => {
    console.log("error in db")
})

export default db;