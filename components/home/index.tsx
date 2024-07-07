"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Home() {
    const fetchItem = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BIDDING_SERVICE_URL}/items`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error("No data found");
        }
        const res = await response.json();

        return res.data;
    };

    const itemsResponse = useQuery({
        queryKey: ["items"],
        queryFn: fetchItem,
    });

    const router = useRouter();

    if (itemsResponse.error) {
        return (
            <div className="flex justify-center items-center h-[90vh] w-screen">
                <h1 className="text-2xl font-semibold">
                    {" "}
                    Error fetching items
                </h1>
            </div>
        );
    }
    return (
        <section>
            <h1 className="ml-6 text-xl mt-4 mb-2">Items Available to Bid</h1>
            <ScrollArea className="ml-7 w-[98%] bg-slate-50 h-[22rem]">
                <div className="flex w-max space-x-4 h-[21rem] p-4">
                    {itemsResponse.isLoading
                        ? Array(10)
                              .fill("")
                              .map((_, index) => (
                                  <div
                                      key={index}
                                      className="border w-52 bg-white px-2 py-2">
                                      <Skeleton className="w-full h-32 mb-5"></Skeleton>
                                      <Skeleton className="w-full h-8 mb-3"></Skeleton>
                                      <Skeleton className="w-full h-8"></Skeleton>
                                  </div>
                              ))
                        : itemsResponse.data.map((item: any) => (
                              <div
                                  key={item.id}
                                  className="border w-52 bg-white px-2 py-2 cursor-pointer hover:bg-slate-50 hover:border-slate-50  transition duration-300 ease-in-out"
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
                                  <h2>
                                      <span className="font-semibold">
                                          Name:
                                      </span>{" "}
                                      {item.name.length > 17
                                          ? item.name.substring(0, 17) + "..."
                                          : item.name}
                                  </h2>
                                  <p>
                                      <span className="font-semibold">
                                          Description:
                                      </span>{" "}
                                      {item.description.length > 40
                                          ? item.description.substring(0, 40) +
                                            "..."
                                          : item.description}
                                  </p>
                                  <p>
                                      <span className="font-semibold">
                                          Starting Bid:
                                      </span>{" "}
                                      ₹{item.initialAmount}
                                  </p>
                                  <p>
                                      <span className="font-semibold">
                                          Seller:
                                      </span>{" "}
                                      {item.seller}
                                  </p>
                              </div>
                          ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>
    );
}

export default Home;
