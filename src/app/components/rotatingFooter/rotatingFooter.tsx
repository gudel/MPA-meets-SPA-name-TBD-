"use client";
import { useState, useEffect } from "react";
import styles from "./rotatingFooter.module.css";
import { useAppSelector } from "@/app/lib/hooks";

export default function RotatingText() {
  const texts = ["Sarapz", "gudel", "Endjuro"];
  const [index, setIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const active = useAppSelector(state => state.Ui.footerVisible)

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
  },[]);


  return active ? (
    <>CC-BY-NC-SA 2025&nbsp;
      <span className={`${styles.text} ${isBlinking ? styles.blinkOut : styles.fadeIn}`}>
        {texts[index]} 
      </span> 
    </>
  ) : null;//simulate animation in span
}
