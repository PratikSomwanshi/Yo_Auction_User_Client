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
        console.log(res);
        return res.data;
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
            <ScrollArea className="ml-7 w-[98%] bg-slate-50 h-[19rem]">
                <div className="flex w-max space-x-4 overflow-hidden h-[18rem] p-4">
                    {itemsResponse.data.map((item: any) => (
                        <div
                            key={item.id}
                            className="border w-52 bg-white px-2 py-2"
                            onClick={() => {
                                router.push(`/items/${item.id}`);
                            }}>
                            <div className="w-full bg-green-200">
                                <img
                                    src={item.imageUrl.low}
                                    alt={item.name}
                                    className="h-32 w-full object-cover  bg-slate-200 mb-2 "
                                />
                            </div>
                            <h2>Name: {item.name}</h2>
                            <p>
                                Description: {item.description.substring(0, 40)}
                                ...
                            </p>
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>
    );
}

export default Items;
