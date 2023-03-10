import supertest from "supertest";
import app from "../App.js";
import mongoose from "mongoose";


const supertest1 = supertest.agent(app);

describe("Create user before login", () =>
{

    test("Should create a new user", async () =>
    {
        const user_data =
        {
            "username": "tryLogin",
            "email": "tryLogin.doe@example.com",
            "password": "tryLogin.123456",
            "location": "Vilnius",
            "profile_picture": "default_profile_picture",
            "phone_number": "+37061884567",
            "description": "This is a test user"
        };

        const response = await supertest1
            .post("/api/v1/user/registration")
            .send(user_data);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message", "New user created");
    })

    test("trying to login with empty username field", async () =>
    {
        
    })

})

afterAll(async () =>
{
    await mongoose.connection.close();
});