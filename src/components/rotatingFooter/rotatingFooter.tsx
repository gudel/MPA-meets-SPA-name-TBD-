"use client"; // Ensures it's a client component

import { useState, useEffect } from "react";

export default function RotatingText() {
    const texts = ["Sarapz", "gudel", "Endjuro"];
    const [index, setIndex] = useState(0);
    const [isBlinking, setIsBlinking] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIsBlinking(true); // Start blink
        setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % texts.length);
          setIsBlinking(false); // Stop blink after text change
        }, 400); // Blink duration before switching text
      }, 2000); // Total cycle = 2s
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <span className={`text-lg inline-block min-w-[54px] text-center transition-opacity duration-500 ${isBlinking ? 'opacity-0' : 'opacity-100'}`}>
        {texts[index]}
      </span>
    );
  }
  