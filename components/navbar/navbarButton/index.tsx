"use client";
import { SessionData } from "@/utils/lib";
import { IronSession } from "iron-session";
import React from "react";

function NavbarButton({
    logout,
    session,
}: {
    logout: () => void;
    session: IronSession<SessionData>;
}) {
    const handleLogout = () => {
        logout(); // Call the logout function
    };
    return (
        <button onClick={handleLogout}>
            <div>Hello, {session.username}</div>
        </button>
    );
}

export default NavbarButton;
