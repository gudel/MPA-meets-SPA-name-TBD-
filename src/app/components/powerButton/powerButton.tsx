    'use client'
    //emitter component.
    import { useState } from "react"
    import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
    import Image from "next/image"
    import styles from "./powerButton.module.css"
    import { powerSignal } from "@/app/lib/store/actions/actions"
    
    
    //default function, boot control
    export default function PowerButton() {
        const [isOn, setIsOn] = useState (false);
        const dispatch = useAppDispatch();
        const idle = useAppSelector(state => state.Ui.bootStatus) //track idle status from reducer, spam defense.

    //toggle function with signal emission to store.
    const bootState = () => {
        const status =   !isOn ? 'on' : 'off' //define payload for signal.
        setIsOn(!isOn); // isolated render.
        dispatch (powerSignal(status));  // updates state on action.ts
        //Insert debug code in this line if needed.
    };

    //return element, one for mobile one for desktop. Render conditionally with "md" and "block" values in tailwind.
    return (
        <>
        <div className={`absolute border-2 rounded-full h-8 w-10 top-21 right-2 hidden md:block ${styles.borderOpacity} ${styles.customDropShadow}`}>
        <button 
        onClick={bootState}
        disabled={idle !== 'idle'}
        className={`flex relative bg-[rgba(255,0,0,0.3)] h-full w-full rounded-full overflow-hidden drop-shadow-[0_0_2px_rgba(255,255,25,0.8)] disabled:cursor-not-allowed ${isOn ? styles.invertedImage : styles.defaultImage}`}>
            <Image 
            src="/Cat.svg"
            alt="power" 
            fill
            className={`drop-shadow-[0_0_8px_rgba(0,255,25,0.8)] ${isOn ? styles.invertedImage : styles.defaultImage}`}
            />
        </button>
        
        </div>

         <div className={`absolute border-2 rounded-full h-8 w-10 top-21 right-2 block md:hidden ${styles.borderOpacity} ${styles.customDropShadow}`}>
         <button 
         onClick={bootState}
         disabled={idle !== 'idle'}
         className={`flex relative bg-[rgba(255,0,0,0.3)] h-full w-full rounded-full overflow-hidden drop-shadow-[0_0_2px_rgba(255,255,25,0.8)] disabled:cursor-not-allowed ${isOn ? styles.invertedImage : styles.defaultImage}`}>
             <Image 
             src="/Cat.svg"
             alt="power" 
             fill
             priority
             className={`drop-shadow-[0_0_8px_rgba(0,255,25,0.8)] ${isOn ? styles.invertedImage : styles.defaultImage}`}
             />
         </button>
         
         </div>
         </>
    )
    }