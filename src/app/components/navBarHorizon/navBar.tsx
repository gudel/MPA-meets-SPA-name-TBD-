'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./navBar.module.css"; // import the css module for navbar
import Image from "next/image";
import { useAppSelector } from "@/app/lib/hooks";

//Define navItems, moved outside of scope so it can be exported and used by another component later on.
export const navItems = [
    { name: "Home", href: "/" },
    { name: "Dev log", href: "/devBlog" },
    { name: "Credits", href: "/credits" },
    { name: "Comments", href: "/comments"}
  ];

export default function Navbar() {
    const active = useAppSelector(state => state.Ui.navbarVisible) 
    const pathname = usePathname();
    const [isMenuVisible, setIsMenuVisible] = useState (false); //track the visibility of the <ul> component
    const [isInverted, setIsInverted] = useState(false); // Track the inversion of the image   

     // Function to toggle the visibility of the <ul> and invert effect
     const toggleMenu = () => {
        setIsMenuVisible(prevState => !prevState); // Toggle the <ul>
        setIsInverted(prevState => !prevState); // Toggle the invert state
    };

    // Gate rendering the component, controlled by BootSaga.
    return active ? (
        <nav className={styles.navbar}>
            {/* implement image above navbar*/}
            <button className="absolute md:top-[-26px] translate-y-4 top-[12px] md:-left-[-32px] left-[12px] w-auto h-auto items-center justify-center z-20 block md:block"
             onClick={toggleMenu} > 
                <div
                    className={`animate-spin [animation-duration:13s] ease-linear relative overflow-visible w-10 h-10 md:w-20 md:h-20 drop-shadow-[0_0_8px_rgba(0,255,25,0.8)] bg-gray-200/40 rounded-full flex items-center justify-center ${isInverted ? 'invert' : ''}`} 
                >
                    <Image
                    src="/radioactive.svg"
                    alt="icon"
                    fill
                    priority
                    className="animate-pulse" //animate pulse infinitely
                    />
                </div>
            </button>

            {/* Conditional rendering of the ul based on the state */}
            {isMenuVisible && (
                <ul className={styles.navList}>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href}
                                className={`${styles.navlink} ${pathname === item.href ? styles.active : ""}`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    ) : null;
};