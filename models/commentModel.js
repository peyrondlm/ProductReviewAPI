import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    review_id: { type: mongoose.Schema.Types.ObjectId, ref: 'review', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
})

const Comment = mongoose.model("comment", commentSchema);
export default Comment;
