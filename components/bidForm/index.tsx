import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getSession } from "@/utils/actions";
import { IronSession } from "iron-session";
import { SessionData } from "@/utils/lib";
import useStore from "@/store";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface BidFormProps {
    currentHighestBid: number;
    setErrorMessage: (message: string) => void;
    socket: Socket;
    username: string | undefined;
    errorMessage: string;
    itemId: string;
    itemResponse: UseQueryResult<any, Error>;
}

const BidForm = ({
    currentHighestBid,
    setErrorMessage,
    socket,
    username,
    errorMessage,
    itemId,
    itemResponse,
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

        //

        if (!(itemResponse.data.initialAmount < parseInt(amount))) {
            setErrorMessage(
                `Bid amount must be greater than the initial amount of $${itemResponse.data.initialAmount}.`
            );
            return;
        }

        const bid = {
            amount: parseFloat(amount),
            userId: username,
            itemId: itemId,
        };

        setErrorMessage("");
        socket.emit("bid", bid);
    };

    if (itemResponse.isLoading) return <div>Loading...</div>;

    return (
        <form id="bidForm" onSubmit={placeBid} className="w-[50%] space-y-2">
            <div className="bg-white w-full h-44 rounded-sm overflow-hidden">
                {/* {JSON.stringify(itemResponse.data.imageUrl)} */}
                <img
                    alt="image"
                    src={itemResponse.data.imageUrl.medium}
                    className="w-full h-full object-cover object-top  bg-slate-200 mb-2"
                />
            </div>

            <br />
            <label htmlFor="amount">
                {itemResponse.data.status == "sold" ? "" : "Bid Amount:"}
            </label>
            <Input
                className="bg-white"
                type="number"
                id="amount"
                name="amount"
                value={amount}
                disabled={itemResponse.data.status == "sold"}
                onChange={(e) => {
                    setErrorMessage("");
                    setAmount(e.target.value);
                }}
            />
            <br />

            <div className="w-full flex justify-center">
                {itemResponse.data.status != "sold" ? (
                    <Button
                        className="bg-green-400 px-2 py-2 rounded-md w-[70%]"
                        type="submit"
                        id="placeBid">
                        Place Bid
                    </Button>
                ) : (
                    <Button
                        className="px-2 py-2 rounded-md w-[70%] disabled:opacity-50 disabled:bg-gray-400"
                        type="submit"
                        id="placeBid"
                        disabled={true}>
                        Item Sold
                    </Button>
                )}
            </div>
            <div className="text-red-400 h-10">
                {errorMessage && errorMessage}
            </div>
        </form>
    );
};

export default BidForm;
