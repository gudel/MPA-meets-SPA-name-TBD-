//Thematically consistent loader component.
//does not care about speed, it sets the pace.
//simulate CLI behavior.
//all comments are learning artifacts and stays for posterity.

'use client'
import { usePathname } from "next/navigation"; //APP Router. get current path.
import { useLayoutEffect, useState } from "react";  // hooks, side effects and state.
import styles from './Loader.module.css'

const Loader: React.FC<{children: React.ReactNode}> = ({children}) => {
const pathname = usePathname(); //get current path. bind it to a local variable

const [loading, setLoading] = useState(false); //set state
const [percentage, setPercentage] = useState(0); //loading illusion


//wtf is this pattern. my head.
//Yes it still looks like  a black box to me. useLayoutEffect used over useEffect because it handles hydration race better.
// 5/4/2025: applied basic math. remove it for negligent performance gain if 'performance' is considered a good thing.
// it is not, this is nextjs. js frameworks are heavy. This component exploits that.
useLayoutEffect (() => {
    setLoading(true);
     // Random start between 20-70% for precentage illusion
     const start = Math.floor(Math.random() * 50) + 20;
     setPercentage(start);
    const timer = setTimeout(() => {
    setLoading(false);
    setPercentage(100); // Flash 100% before unmounting, won't be seen. but good enough.
  }, 600); //introduce delay. 1s is acceptable, ig? Correction. 600 ms seems to be a good middle ground.

   // Basic increment - no smooth animation, randomised number. simulate system progress. I totally did not steal this from a random website.
   const progressTimer = setInterval(() => {
    setPercentage(p => Math.min(p + 1, 100));
  }, 600 / (100 - start));

  return () =>{ 
    clearTimeout(timer);
    clearInterval(progressTimer);} //cleanup. Why is it (timer)? To reset the worker and ensure no memory leaks is present.
},[pathname]); //runs everytime path changes.
    //try to make loading screen, page aware. CLI skeumorph.

 // console.log(loading); //debug point. check here if component breaks.
 return loading ? (
      <div className="flex items-center justify-center min-h-[50vh]"> {/*manual height configuration to at least center it on screen*/}
        <div className="flex flex-col text-left">
        <p>{'$[user]> ../local/ initializing..'}</p>
        {/*Precentage incrementation to give illusion of 'progress' instead of delayed process.*/}
        <>
        <p>{`$[user]> ../local/ prefetch/${pathname}`}</p>
        <p>{`$[user]> ../local/ mounting/${pathname}....`}</p>
        <p>{`$[sys]> Loading modules.... [${percentage}%]`}<span className={`${styles.cursor}`}>█</span></p>
        </>
        </div>
      </div>
    ) : (
       <>{children}</>
    );
  
};

export default Loader;
