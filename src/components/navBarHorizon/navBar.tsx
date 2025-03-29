'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navBar.module.css"; // import the css module for navbar

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