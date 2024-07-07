"use server";
import { SessionData, defaultSession, sessionOptions } from "@/utils/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CustomError from "./CustomError";

export const getSession = async () => {
    const session = await getIronSession<SessionData>(
        cookies(),
        sessionOptions
    );

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
};

interface loginData {
    username: string;
    password: string;
}

export const login = async (data: loginData) => {
    const session = await getSession();

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BIDDING_SERVICE_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const res = await response.json();

    if (response.ok) {
        session.username = res.username;
        session.token = res.token;
        session.isLoggedIn = true;
        await session.save();
        redirect("/");
        return;
    }

    throw new CustomError(res.message);
};

export const register = async (data: loginData) => {
    const session = await getSession();

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BIDDING_SERVICE_URL}/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const res = await response.json();

    if (response.ok) {
        session.username = res.username;
        session.token = res.token;
        session.isLoggedIn = true;
        await session.save();
        redirect("/");
        return;
    }

    if (res.error.explanation) {
        throw new CustomError(res.error.explanation);
    } else {
        throw new CustomError("Something went wrong");
    }
};

export const logOut = async () => {
    const session = await getSession();
    session.destroy();
};
