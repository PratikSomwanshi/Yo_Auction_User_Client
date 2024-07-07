import React from "react";
import Auction from "@/components/auction";
import { getSession } from "@/utils/actions";
import { redirect } from "next/navigation";

async function ActionHomePage({ params }: { params: { id: string } }) {
    const session = await getSession();

    if (!session.isLoggedIn) {
        redirect("/login");
    }

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

export default ActionHomePage;
