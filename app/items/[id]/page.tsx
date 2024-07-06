import React from "react";
import Auction from "@/components/auction";
import { getSession } from "@/utils/actions";
import Link from "next/link";

async function ActionHomePage({ params }: { params: { id: string } }) {
    const session = await getSession();

    if (session.isLoggedIn) {
        return (
            <div>
                <Auction
                    username={session.username}
                    tocken={session.token}
                    itemId={params.id}
                />
            </div>
        );
    }

    return (
        <div>
            <h1>Home Page</h1>
            <p>
                <Link href="/login">Log in</Link> to access the auction
            </p>
        </div>
    );
}

export default ActionHomePage;
