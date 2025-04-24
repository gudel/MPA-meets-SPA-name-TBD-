'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./navBar.module.css"; // import the css module for navbar
import Image from "next/image";
import { useAppSelector } from "@/app/lib/hooks";

export default function Navbar() {
    const isNavbarVisible = useAppSelector(state => state.Ui.navbarVisible) //I'm stuck on this. It does not connect.
    console.log("Navbar visibility:", isNavbarVisible);
    const pathname = usePathname();
    const [isMenuVisible, setIsMenuVisible] = useState (false); //track the visibility of the <ul> component
    const [isInverted, setIsInverted] = useState(false); // Track the inversion of the image

    // Define navbar items
    const navItems = [
        { name: "Home", href: "/"},
        { name: "Product", href: "/product"},
        { name: "About", href: "/about"},
    ];

    console.log("Navbar visibility:", isNavbarVisible);
    console.log("Menu visibility:", isMenuVisible);

     // Function to toggle the visibility of the <ul> and invert effect
     const toggleMenu = () => {
        setIsMenuVisible(prevState => !prevState); // Toggle the <ul>
        setIsInverted(prevState => !prevState); // Toggle the invert state
    };

    useEffect(() => {
        if (!isNavbarVisible) {
            setIsMenuVisible(false);  // Close the menu if navbar is hidden, comment this feat if tanking performance.
        }
    }, [isNavbarVisible]);  // Depend on isNavbarVisible to trigger when it changes

    // Gate rendering the component, controlled by BootSaga.
    if (!isNavbarVisible) return null;

    else return (
        <nav className={styles.navbar}>
            {/* implement image above navbar*/}
            <button className="absolute top-[-26px] -left-[-32px] w-auto h-auto items-center justify-center z-20 hidden md:block">
                <div
                    className={`animate-spin [animation-duration:13s] ease-linear relative overflow-visible w-20 h-40 sm:w-22 sm:h-22 drop-shadow-[0_0_8px_rgba(0,255,25,0.8)] bg-gray-200/40 rounded-full flex items-center justify-center ${isInverted ? 'invert' : ''}`} 
                    onClick={toggleMenu} // Add the click event handler
                >
                    <Image
                    src="/radioactive.svg"
                    alt="icon"
                    fill
                    className="animate-pulse" //animate pulse infinitely
                    />
                </div>
            </button>
            {/*image for mobile*/}
            <button className="absolute top-[-10px] -left-[-10px] w-auto h-auto items-center justify-center z-20 block md:hidden">
                <div
                    className={`animate-spin [animation-duration:13s] ease-linear relative overflow-visible w-12 h-12 sm:w-22 sm:h-22 drop-shadow-[0_0_8px_rgba(0,255,25,0.8)] bg-gray-200/40 rounded-full flex items-center justify-center ${isInverted ? 'invert' : ''}`} 
                    onClick={toggleMenu} // Add the click event handler
                >
                    <Image
                    src="/radioactive.svg"
                    alt="icon"
                    fill
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
    );
}