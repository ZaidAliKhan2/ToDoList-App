import mongoose from "mongoose";

const todoTaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: true,
        trim: true
    }
});
export const Todo = mongoose.model("Todo", todoTaskSchema); 