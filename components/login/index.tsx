"use client";
import { login } from "@/utils/actions";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
        <div className="w-screen h-[90vh] flex justify-center items-center rounded-md">
            <div className="bg-slate-100 w-[30%] h-[50%] px-3 ">
                <h1 className="mb-6 mt-4 underline text-lg text-end">
                    User Login
                </h1>
                <form onSubmit={handleSubmit} className="px-2 ">
                    <div className="space-y-1">
                        <label htmlFor="username">Username:</label>
                        <Input
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
                    <div className="mb-5 mt-2 space-y-1">
                        <label htmlFor="password">Password:</label>
                        <Input
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
                    <div className="w-full flex justify-center items-center">
                        <Button type="submit" className="w-[70%] bg-green-500">
                            Login
                        </Button>
                    </div>
                    {errorMessage && (
                        <p className="text-red-400 mt-3 text-center">
                            {errorMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;
