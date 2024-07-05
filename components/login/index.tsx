"use client";
import { login } from "@/utils/actions";
import React, { useState } from "react";
import CustomError from "@/utils/CustomError";
import useStore from "@/store";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = () => {
        // Clear error message when input changes
        setErrorMessage("");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Check if username or password is empty
        if (!username || !password) {
            setErrorMessage("Username and password are required.");
            return;
        }
        console.log("username", username, "password", password);
        try {
            const res: any = await login({ username, password });
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="bg-gray-200"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            handleInputChange(); // Clear error message on input change
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        className="bg-gray-200"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            handleInputChange(); // Clear error message on input change
                        }}
                    />
                </div>
                <button type="submit">Login</button>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Login;
