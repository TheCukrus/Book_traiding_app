import model_user from "../models/model_user.js";
import supertest from "supertest";
import app from "../App.js";
import mongoose from "mongoose";


const supertest1 = supertest.agent(app);

describe("create user", () =>
{
    it("should create a new user", async () =>
    {
        const user_data =
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "Password123!",
            "location": "Vilnius",
            "profile_picture": "default_profile_picture",
            "phone": "+37061234689",
            "description": "This is a test user"
        };
        const response = await supertest1
            .post("/api/v1/user/registration")
            .send(user_data);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message", "New user created");
    })
})

test("Close db connection", async function ()
{
    const result1 = await mongoose.connection.close();
})

