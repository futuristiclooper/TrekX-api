import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
    {
        video: {
            type: mongoose.Types.ObjectId,
            ref: "Video",
        },
        likedBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true
    }
);

export const Like = mongoose.model("Like", likeSchema);
