export default class Register {
    private static url: string = "https://reqres.in/api/register"; // fake route

    public static async register(
        username: string,
        email: string,
        password: string
    ): Promise<{ token?: string; error?: string }> {
    try {
        const response = await fetch(Register.url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
        return { token: data.token };
        } else {
        return { error: data.error };
        }
    } catch (error) {
        return { error: "Error when trying to register." };
    }
    }
}