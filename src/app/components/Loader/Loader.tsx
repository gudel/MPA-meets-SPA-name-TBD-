'use client'
import { usePathname } from "next/navigation"; //APP Router. get current path.
import { useLayoutEffect, useState } from "react";  // hooks, side effects and state.

const Loader: React.FC<{children: React.ReactNode}> = ({children}) => {
const pathname = usePathname(); //get current path. bind it to a local variable

const [loading, setLoading] = useState(false); //set state


//wtf is this pattern. my head.
//Yes it still looks like  a black box to me. useLayoutEffect used over useEffect because it handles hydration race better.
useLayoutEffect (() => {
    setLoading(true);
    const timer = setTimeout(() => {
    setLoading(false);
  }, 1200); //introduce delay 1s is acceptable, ig?

  return () => clearTimeout(timer); //cleanup. Why is it (timer)?
},[pathname]); //runs everytime path changes.
    //try to make loading screen, page aware. CLI skeumorph.

  console.log(loading);
 return loading ? (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col text-left">
        <p>{`<user>../local/ initializing..`}</p>
        {/*delay below text conditionally*/}
        <>
        <p>{`<user>../local/ loading/${pathname}`}</p>
        <p className={`animate-pulse`}>{`<user>../local/ mounting/${pathname}`}</p>
        </>
        </div>
      </div>
    ) : (
       <>{children}</>
    );
  
};

export default Loader;
