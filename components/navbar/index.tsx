import { getSession, logOut } from "@/utils/actions";
import Link from "next/link";
import React from "react";
import NavbarButton from "./navbarButton";
import Logo from "../logo";

async function Navbar() {
    const session = await getSession();

    const logout = async () => {
        "use server";
        await logOut();
    };

    return (
        <div className="h-12 flex justify-around items-center bg-gray-100">
            <Link href="/" className="h-full flex items-center">
                <Logo width={130} height={130} />
            </Link>
            <div className="flex  w-[20%] justify-between">
                {session.isLoggedIn ? (
                    <NavbarButton session={session} logout={logout} />
                ) : (
                    <>
                        <Link href="/login">
                            <div>Login</div>
                        </Link>
                        <Link href="/register">
                            <div>Register</div>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
