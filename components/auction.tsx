"use client";

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import BidForm from "./bidForm";
import BidsList from "./bidList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { getSession, logOut } from "@/utils/actions";

interface Bid {
    amount: number;
    userId: number;
    itemId: number;
}

const Auction = ({
    username,
    itemId,
    tocken,
}: {
    username: string | undefined;
    itemId: string;
    tocken: string;
}) => {
    const [currentHighestBid, setCurrentHighestBid] = useState(0);
    const [allBids, setAllBids] = useState<Bid[]>([]);
    const [currentBid, setCurrentBid] = useState<Bid>();
    const [errorMessage, setErrorMessage] = useState("");
    const [webSocketError, setWebSocketError] = useState("");

    const queryClient = useQueryClient();

    const socket: Socket = io("http://localhost:8000/auction", {
        auth: {
            token: tocken,
        },
    });
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
            socket.emit("getHighestBid", itemId);
            setWebSocketError("");
        });

        socket.on("connect_error", async (error: any) => {
            if (error.data.content) {
                await logOut();
            }
            console.error("Connection error:", error);
            setWebSocketError("Connection error: " + error.message);
        });

        socket.on("highestBid", (data) => {
            if (data.message) {
                setCurrentHighestBid(0);
                queryClient.invalidateQueries({ queryKey: ["item"] });
            } else {
                queryClient.invalidateQueries({ queryKey: ["item"] });
                console.log("Highest bid received:", data);
                setCurrentHighestBid(data.amount);
            }
        });

        socket.on("bid", (newBid: Bid) => {
            console.log("New bid received:", newBid);
            setAllBids((prevBids) => [...prevBids, newBid]);
        });

        socket.on("bidError", (error) => {
            console.error("Bid error:", error);
            setErrorMessage("Bid error: " + error.message);
        });

        socket.on("error", (error) => {
            console.error("Error:", error.message);
            setWebSocketError("Error: " + error.message);
        });

        socket.on("itemSold", () => {
            console.log("Item sold");
            setWebSocketError("Item has been sold.");
        });

        if (currentBid) {
            socket.emit("placeBid", currentBid);
            setCurrentBid(undefined);
        }

        return () => {
            socket.off("connect");
            socket.off("connect_error");
            socket.off("highestBid");
            socket.off("bid");
            socket.off("bidError");
            socket.off("error");
            socket.off("disconnect");
        };
    }, []);

    return (
        <div className="flex  w-screen h-[calc(100vh-8vh)]">
            <section className="flex-1 ml-2">
                <h2 className="text-xl mt-4 mb-3">All Bids</h2>
                <div
                    id="highestBid"
                    className="bg-slate-100  rounded-md px-1 py-2">
                    Highest Bid:{" "}
                    {currentHighestBid !== 0
                        ? `$${currentHighestBid}`
                        : "No bids placed yet"}
                </div>
                <br />
                <br />
                <div className="flex justify-center">
                    <BidsList allBids={allBids} />
                </div>
            </section>

            <section className="bg-slate-100 flex flex-1 justify-center items-center">
                <BidForm
                    currentHighestBid={currentHighestBid}
                    setErrorMessage={setErrorMessage}
                    socket={socket}
                    username={username}
                    errorMessage={errorMessage}
                    itemId={itemId}
                />
            </section>

            {webSocketError && (
                <div className="h-[92vh] w-screen bg-slate-100 absolute">
                    <Alert
                        className="absolute top-[35%] right-[25%] w-[50vw]"
                        variant="destructive">
                        <AlertTitle>
                            <span className="flex items-center space-x-2">
                                <AlertCircle className="w-6 h-6" />
                                <span>Error</span>
                            </span>
                        </AlertTitle>
                        <AlertDescription>{webSocketError}</AlertDescription>
                    </Alert>
                </div>
            )}
        </div>
    );
};

export default Auction;
