import Login from "@/components/login";
import { getSession } from "@/utils/actions";
import { redirect } from "next/navigation";
import React from "react";

async function LoginPage() {
    const session = await getSession();

    if (session.isLoggedIn) {
        redirect("/");
    }

    return (
        <div>
            <Login />
        </div>
    );
}

export default LoginPage;
