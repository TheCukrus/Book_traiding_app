import mongoose from "mongoose";

const schema_rating = new mongoose.Schema(
    {
        "user_id": { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        "rating": { type: Number, require: true },
        "created_at": { type: Date, default: Date.now }
    }
)

const Rating = mongoose.model("Rating", schema_rating);

export default Rating;