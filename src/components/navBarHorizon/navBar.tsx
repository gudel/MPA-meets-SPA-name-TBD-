'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./navBar.module.css"; // import the css module for navbar
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuVisible, setIsMenuVisible] = useState (false); //track the visibility of the <ul> component

    // Define navbar items
    const navItems = [
        { name: "Home", href: "/"},
        { name: "Product", href: "/product"},
        { name: "About", href: "/about"},
    ];

    return (
        <nav className={styles.navbar}>
            {/* implement image above navbar*/}
            <div className="absolute top-[-26px] -left-[-32px] w-auto h-auto items-center justify-center z-20 hidden md:block">
                <div className="animate-spin [animation-duration:13s] ease-linear relative overflow-visible w-20 h-40 sm:w-22 sm:h-22 drop-shadow-[0_0_8px_rgba(0,255,25,0.8)] bg-gray-200/40 rounded-full flex items-center justify-center hover:invert ">
                    <Image
                    src="radioactive.svg"
                    alt="icon"
                    fill
                    className="animate-pulse"
                    />
                </div>
            </div>
            {/*image for mobile*/}
            <div className="absolute top-[-10px] -left-[-10px] w-auto h-auto items-center justify-center z-20 block md:hidden">
                <div className="animate-spin [animation-duration:13s] ease-linear relative overflow-visible w-12 h-12 sm:w-22 sm:h-22 drop-shadow-[0_0_8px_rgba(0,255,25,0.8)] bg-gray-200/40 rounded-full flex items-center justify-center">
                    <Image
                    src="radioactive.svg"
                    alt="icon"
                    fill
                    className="animate-pulse"
                    />
                </div>
            </div>
            <ul className={styles.navList}>
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href}
                        className={`${styles.navlink} ${pathname == item.href ? styles.active : ""}`}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}