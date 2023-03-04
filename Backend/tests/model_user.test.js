import bcrypt from "bcryptjs";

const salt_rounds = 10;

describe("Password hashing", () =>
{
    test("Should hash password correctly", async () =>
    {
        const password = "test123";
        const hashed_password = await bcrypt.hash(password, salt_rounds);
        expect(hashed_password).not.toBe(password);
        expect(typeof hashed_password).toBe("string");
    });
});

