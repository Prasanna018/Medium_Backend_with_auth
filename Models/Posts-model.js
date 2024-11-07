import mongoose from "mongoose";
// import { object } from "zod";

const PostSchema = new mongoose.Schema({
    postedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    username: {
        type: String,
        ref: "users"

    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true }
)

const postDb = mongoose.model("posts", PostSchema);
export default postDb;


