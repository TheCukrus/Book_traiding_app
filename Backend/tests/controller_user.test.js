import supertest from "supertest";
import app from "../App.js";
import mongoose from "mongoose";


const supertest1 = supertest.agent(app);

describe("Create user", () =>
{

    test("Should create a new user", async () =>
    {
        const user_data =
        {
            "username": "John",
            "email": "john.doe@example.com",
            "password": "Testing.123456",
            "location": "Vilnius",
            "profile_picture": "default_profile_picture",
            "phone_number": "+37061234567",
            "description": "This is a test user"
        };

        const response = await supertest1
            .post("/api/v1/user/registration")
            .send(user_data);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message", "New user created");
    })

    test("Shouldn't create user with same name", async () =>
    {
        const same_name_user = {
            "username": "John",
            "email": "johne.doe@example.com",
            "password": "Password1233!",
            "location": "Vilnius",
            "profile_picture": "default_profile_picture",
            "phone_number": "+37061234679",
            "description": "This is a test user"
        };
        const response = await supertest1
            .post("/api/v1/user/registration")
            .send(same_name_user);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "This username is already taken.")
    })

    test("Shouldn't create a new user with existing phone number", async () =>
    {
        const user_data =
        {
            "username": "Johnas",
            "email": "johna.doe@example.com",
            "password": "Password1123!",
            "location": "Vilnius",
            "profile_picture": "default_profile_picture",
            "phone_number": "+37061234567",
            "description": "This is a test user"
        };
        const response = await supertest1
            .post("/api/v1/user/registration")
            .send(user_data);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "This phone number is used by onother user.");
    })

    test("Shouldn't create a new user with existing email", async () =>
    {
        const user_data =
        {
            "username": "Johna Doe",
            "email": "john.doe@example.com",
            "password": "Password1232!",
            "location": "Vilnius",
            "profile_picture": "default_profile_picture",
            "phone_number": "+37061234368",
            "description": "This is a test user"
        };
        const response = await supertest1
            .post("/api/v1/user/registration")
            .send(user_data);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "This email is taken.");
    })

    test("Shouldn't creare user because of invalid password(too short)", async () =>
    {
        const user_data =
        {
            "username": "Johna Doe",
            "email": "johna.doe@example.com",
            "password": "P3!",
            "location": "Vilnius",
            "profile_picture": "default_profile_picture",
            "phone_number": "+373061234689",
            "description": "This is a test user"
        };
        const response = await supertest1
            .post("/api/v1/user/registration")
            .send(user_data);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Password should have minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character");
    })

    test("Shouldn't creare user because of invalid password(doesn't contain numbers)", async () =>
    {
        const user_data =
        {
            "username": "Johna Doe",
            "email": "johna.doe@example.com",
            "password": "Passwordas!",
            "location": "Vilnius",
            "profile_picture": "default_profile_picture",
            "phone_number": "+373061234689",
            "description": "This is a test user"
        };
        const response = await supertest1
            .post("/api/v1/user/registration")
            .send(user_data);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Password should have minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character");
    })

    test("Shouldn't creare user because of invalid password(doesn't contain any special character)", async () =>
    {
        const user_data =
        {
            "username": "Johna Doe",
            "email": "johna.doe@example.com",
            "password": "Password12345",
            "location": "Vilnius",
            "profile_picture": "default_profile_picture",
            "phone_number": "+373061234689",
            "description": "This is a test user"
        };
        const response = await supertest1
            .post("/api/v1/user/registration")
            .send(user_data);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Password should have minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character");
    })
})

afterAll(async () =>
{
    await mongoose.connection.close();
});