// "use client";
// import { register } from "@/utils/actions"; // Make sure to implement this action
// import React, { useState } from "react";

// function Register() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");

//     const handleInputChange = () => {
//         // Clear error message when input changes
//         setErrorMessage("");
//     };

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         // Check if username or password is empty
//         if (!username || !password || !confirmPassword) {
//             setErrorMessage("All fields are required.");
//             return;
//         }

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             setErrorMessage("Passwords do not match.");
//             return;
//         }

//
//         try {
//             const res: any = await register({ username, password });
//             // Handle successful registration (e.g., redirect to login page)
//         } catch (error: any) {
//
//             if (error.message == "fetch failed") {
//                 setErrorMessage(
//                     "Unable to connect to the server. Please try again later."
//                 );
//             } else {
//                 setErrorMessage(error.message);
//             }
//         }
//     };

//     return (
//         <div>
//             <h1>Register Page</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="username">Username:</label>
//                     <input
//                         type="text"
//                         id="username"
//                         className="bg-gray-200"
//                         value={username}
//                         onChange={(e) => {
//                             setUsername(e.target.value);
//                             handleInputChange(); // Clear error message on input change
//                         }}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         className="bg-gray-200"
//                         value={password}
//                         onChange={(e) => {
//                             setPassword(e.target.value);
//                             handleInputChange(); // Clear error message on input change
//                         }}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="confirmPassword">Confirm Password:</label>
//                     <input
//                         type="password"
//                         id="confirmPassword"
//                         className="bg-gray-200"
//                         value={confirmPassword}
//                         onChange={(e) => {
//                             setConfirmPassword(e.target.value);
//                             handleInputChange(); // Clear error message on input change
//                         }}
//                     />
//                 </div>
//                 <button type="submit">Register</button>
//                 {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//             </form>
//         </div>
//     );
// }

// export default Register;

"use client";
import { register } from "@/utils/actions"; // Make sure to implement this action
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = () => {
        // Clear error message when input changes
        setErrorMessage("");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Check if username or password is empty
        if (!username || !password || !confirmPassword) {
            setErrorMessage("All fields are required.");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const res: any = await register({ username, password });
            // Handle successful registration (e.g., redirect to login page)
        } catch (error: any) {
            if (error.message === "fetch failed") {
                setErrorMessage(
                    "Unable to connect to the server. Please try again later."
                );
            } else {
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <div className="w-screen h-[90vh] flex justify-center items-center rounded-md">
            <div className="bg-slate-100 w-[30%] h-[65%] px-3">
                <h1 className="mb-6 mt-4 underline text-lg text-end">
                    User Registration
                </h1>
                <form onSubmit={handleSubmit} className="px-2">
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
                            className="bg-gray-200"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handleInputChange(); // Clear error message on input change
                            }}
                        />
                    </div>
                    <div className="mb-5 mt-2 space-y-1">
                        <label htmlFor="confirmPassword">
                            Confirm Password:
                        </label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            className="bg-gray-200"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                handleInputChange(); // Clear error message on input change
                            }}
                        />
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <Button type="submit" className="w-[70%] bg-green-500">
                            Register
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

export default Register;
