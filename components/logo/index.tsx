import Image from "next/image";
import React from "react";

function Logo({
    width,
    height,
    animation,
}: {
    width: number;
    height: number;
    animation?: boolean;
}) {
    return (
        <>
            <Image
                src="/logo.svg"
                alt="logo"
                width={width}
                height={height}
                className={animation ? "animate-pulse" : ""}
            />
        </>
    );
}

export default Logo;
