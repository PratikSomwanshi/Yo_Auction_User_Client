"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import React from "react";

function Items() {
    const fetchTodoList = async () => {
        const response = await fetch("http://localhost:8000/items", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("No data found");
        }
        const res = await response.json();
        return res;
    };

    const itemsResponse = useQuery({
        queryKey: ["items"],
        queryFn: fetchTodoList,
    });

    const router = useRouter();

    if (itemsResponse.isLoading) return <div>Loading...</div>;

    return (
        <section>
            <h1 className="ml-6 text-xl mt-4 mb-2">Items Available to Bid</h1>
            <ScrollArea className="ml-7 w-[98%] bg-slate-50">
                <div className="flex w-max space-x-4 overflow-hidden  p-4">
                    {itemsResponse.data.map((item: any) => (
                        <div
                            key={item.id}
                            className="border w-52 bg-white px-2 py-2"
                            onClick={() => {
                                // redirect(`/items/${item.id}`);
                                console.log("Item clicked");
                                router.push(`/items/${item.id}`);
                            }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-32 bg-slate-200 mb-2"
                            />
                            <h2>Name: {item.name}</h2>
                            <p>Description: {item.description}</p>
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>
    );
}

export default Items;
