import mongoose from "mongoose";
import confing from "../utils/config.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import Rating from "./model_user_rating.js";

const mongoose_connection = mongoose.createConnection(confing.mongoose_url);

//generate a salt for password hashing
const salt_Rounds = 10;

const schema_user = new mongoose.Schema(
    {
        "id": { type: String },
        "name": { type: String, require: true },
        "email": { type: String, require: true },
        "password": { type: String, require: true },
        "location": { type: String, required: true },
        "profile_Picture": { type: String },
        "phone": { type: String, required: true },
        "description": { type: String },
        "created_at": { type: Date, default: Date.now },
        "updated_at": { type: Date, default: Date.now }
    }
);

// Add a pre hook to generate a unique ID before saving the user data to the database.
schema_user.pre("save", function (next)
{
    if (!this.id)
    {
        this.id = uuidv4();
    }
    next();
})

// Add a pre hook to hash the user's password before saving it to the database
schema_user.pre("save", async function (next)
{
    try
    {
        const user = this;
        if (!user.isModified("password"))
        {
            return next();
        }
        const hash = await bcrypt.hash(user.password, salt_Rounds);
        user.password = hash;
        return next();
    }
    catch (err)
    {
        return next(err);
    }
});

//Add a virtual field to get the average rating for the user
schema_user.virtual("rating").get(async function ()
{
    const result = await Rating.aggregate([
        { $match: { user_id: this._id } },
        { $group: { _id: "$user_id", average_rating: { $avg: "$rating" } } },
    ]);
    if (result.length > 0)
    {
        return result[0].average_rating;
    }
    return 0;
});

const model_user = mongoose_connection.model("users", schema_user, "users");

export default model_user;