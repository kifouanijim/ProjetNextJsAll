import { useState, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState<JSX.Element | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.email.value.trim();
    const password = e.currentTarget.password.value.trim();

    if (email === "" || password === "") {
      setError(<p>All fields are required</p>);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      setLoading(false);

      if (!response.ok) {
        const { message } = await response.json();
        setError(<p>{message}</p>);
        console.error("Login failed:", message);
      } else {
        console.log("Login successful");
        if (pathname.startsWith("/login")) {
          router.push("/mon-compte");
        }
        router.refresh();
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setLoading(false);
      setError(<p>An error occurred</p>);
    }
  };

  return (
    <>
      <form method="POST" onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="john.doe@gmail.com"
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" required />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </>
  );
}
