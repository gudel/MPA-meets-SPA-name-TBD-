'use client'

import { useAppSelector } from "@/app/lib/hooks"
import Image from "next/image";

const BootScreen = () => {
    const isBootScreenVisible = useAppSelector(state=>state.Ui.bootScreenVisible);

    if(!isBootScreenVisible) return null;
    else return (
        <div className="grid place-items-center fixed inset-0">
        <Image
        src="/Cat.svg"
        alt="Boot logo"
        height= {120}
        width= {120}
        className="animate-ping"
        />
        </div>
    )
};

export default BootScreen;