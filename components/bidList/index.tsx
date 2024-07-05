import { ScrollArea } from "../ui/scroll-area";

interface Bid {
    amount: number;
    userId: number;
    itemId: number;
}

const BidsList = ({ allBids }: { allBids: Bid[] }) => {
    return (
        <ScrollArea className="h-96 w-[70%] rounded-md border">
            {allBids.map((bid, index) => (
                <span key={index} className="block">
                    {bid.userId} bid ${bid.amount}
                </span>
            ))}
        </ScrollArea>
    );
};

export default BidsList;
