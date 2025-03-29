'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navBar.module.css"; // import the css module for navbar
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();

    // Define navbar items
    const navItems = [
        { name: "Home", href: "/"},
        { name: "Product", href: "/product"},
        { name: "About", href: "/about"},
    ];

    return (
        <nav className={styles.navbar}>
            {/* implement image above navbar*/}
            <div className="absolute top-[-26px] -left-[-32px] w-auto h-auto flex items-center justify-center z-20">
                <div className="animate-spin [animation-duration:13s] ease-linear relative overflow-visible w-20 h-40 sm:w-22 sm:h-22 drop-shadow-[0_0_8px_rgba(0,255,25,0.8)] bg-gray-200/40 rounded-full flex items-center justify-center hover:invert">
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