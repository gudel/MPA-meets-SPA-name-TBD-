    'use client'

    import { useState } from "react"
    import { useAppDispatch } from "@/app/lib/hooks"
    import Image from "next/image"
    import styles from "./powerButton.module.css"
    import { powerSignal } from "@/app/lib/store/actions/actions"
    
    //default function, boot control
    export default function PowerButton() {
        const [isOn, setIsOn] = useState (false);
        const dispatch = useAppDispatch();
        

        //type enforcement
        interface bootStatus {
            state: 'on' | 'off';
        }
    const bootState = () => {
        const status : bootStatus =  {state: !isOn ? 'on' : 'off'}  //manages own state, doesn't care about global.
        setIsOn(!isOn); // isolated render.
        dispatch (powerSignal(status.state));  //Still don't get it(?) Does importing the toggle allows this?
        console.log("update", powerSignal(status.state));
    };

    
    return (
        <>
        <div className={`absolute border-2 rounded-full h-8 w-10 top-21 right-2 hidden md:block ${styles.borderOpacity} ${styles.customDropShadow}`}>
        <button 
        onClick={bootState}
        className={`flex relative bg-[rgba(255,0,0,0.3)] h-full w-full rounded-full overflow-hidden drop-shadow-[0_0_2px_rgba(255,255,25,0.8)] ${isOn ? styles.invertedImage : styles.defaultImage}`}>
            <Image 
            src="cat.svg"
            alt="power" 
            fill
            className={`drop-shadow-[0_0_8px_rgba(0,255,25,0.8)] ${isOn ? styles.invertedImage : styles.defaultImage}`}
            />
        </button>
        
        </div>

         <div className={`absolute border-2 rounded-full h-8 w-10 top-21 right-2 block md:hidden ${styles.borderOpacity} ${styles.customDropShadow}`}>
         <button 
         onClick={bootState}
         className={`flex relative bg-[rgba(255,0,0,0.3)] h-full w-full rounded-full overflow-hidden drop-shadow-[0_0_2px_rgba(255,255,25,0.8)] ${isOn ? styles.invertedImage : styles.defaultImage}`}>
             <Image 
             src="cat.svg"
             alt="power" 
             fill
             className={`drop-shadow-[0_0_8px_rgba(0,255,25,0.8)] ${isOn ? styles.invertedImage : styles.defaultImage}`}
             />
         </button>
         
         </div>
         </>
    )
    }