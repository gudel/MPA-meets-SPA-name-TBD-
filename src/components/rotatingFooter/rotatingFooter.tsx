"use client";

import { useState, useEffect } from "react";
import styles from "./rotatingFooter.module.css";

export default function RotatingText() {
  const texts = ["Sarapz", "gudel", "Endjuro"];
  const [index, setIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);

      // Change text after blink
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsBlinking(false);
      }, 300); // Blink duration before switching text
    }, 2000); // Total cycle: 2s

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`${styles.text} ${isBlinking ? styles.blinkOut : styles.fadeIn}`}>
      {texts[index]} 
    </span> //simulate animation
  );
}
