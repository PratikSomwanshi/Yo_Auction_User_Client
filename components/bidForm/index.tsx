import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getSession } from "@/utils/actions";
import { IronSession } from "iron-session";
import { SessionData } from "@/utils/lib";
import useStore from "@/store";

interface BidFormProps {
    currentHighestBid: number;
    setErrorMessage: (message: string) => void;
    socket: Socket;
    username: string | undefined;
    errorMessage: string;
}

const BidForm = ({
    currentHighestBid,
    setErrorMessage,
    socket,
    username,
    errorMessage,
}: BidFormProps) => {
    const [amount, setAmount] = useState("");

    const placeBid = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        if (!amount) {
            setErrorMessage("Invalid amount. Please enter valid numbers.");
            return;
        }

        if (
            currentHighestBid !== 0 &&
            parseFloat(amount) <= currentHighestBid
        ) {
            setErrorMessage(
                `Bid amount must be greater than the current highest bid of $${currentHighestBid}.`
            );
            return;
        }

        console.log("Placing bid...");
        const bid = {
            amount: parseFloat(amount),
            userId: username,
            itemId: 1,
        };

        setErrorMessage("");
        socket.emit("bid", bid);
    };

    return (
        <form id="bidForm" onSubmit={placeBid} className="w-[50%] space-y-2">
            <div className="bg-white w-full h-44 rounded-sm">
                <img alt="image" />
            </div>

            <br />
            <label htmlFor="amount">Bid Amount:</label>
            <Input
                className="bg-gray-50"
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => {
                    setErrorMessage("");
                    setAmount(e.target.value);
                }}
            />
            <br />

            <div className="w-full flex justify-center">
                <Button
                    className="bg-green-400 px-2 py-2 rounded-md w-[70%]"
                    type="submit"
                    id="placeBid">
                    Place Bid
                </Button>
            </div>
            <div className="text-red-400 h-10">
                {errorMessage && errorMessage}
            </div>
        </form>
    );
};

export default BidForm;
