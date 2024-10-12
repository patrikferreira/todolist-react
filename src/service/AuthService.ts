export default class AuthService {
  private static url: string = "https://reqres.in/api/login"; // fake route

  public static async login(
    username: string,
    password: string
  ): Promise<{ token?: string; error?: string }> {
    try {
      const response = await fetch(AuthService.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return { token: data.token };
      } else {
        return { error: data.error };
      }
    } catch (error) {
      return { error: "Error when trying to log in." };
    }
  }
}
