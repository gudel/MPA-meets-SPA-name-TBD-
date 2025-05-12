'use client'
import { useAppSelector } from "@/app/lib/hooks"
import Image from "next/image";

const BootScreen = () => {
    const active = useAppSelector(state=>state.Ui.bootScreenVisible);

  return active ? (
        <div className="grid place-items-center fixed inset-0">
        <Image
        src="/Cat.svg"
        alt="Boot logo"
        height= {120}
        width= {120}
        className="animate-ping"
        />
        </div>
    ) : null
};

export default BootScreen;