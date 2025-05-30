'use client'
import { useAppSelector } from "@/app/lib/hooks";

// To replace content with lazyloader/animation. <-Deprecated. Will create loading skeleton for this.
// Prop drilling is acceptable tradeoff. This component is nested under ScanlineOverlay.
// Conditionally render {children} by watching state in UiSlice.ts via subscription.
// aimed to simulate system behavior.

const ContentGate: React.FC<{children: React.ReactNode}> = ({children}) => {
    const active = useAppSelector(state => state.Ui.contentGateVisible);

    return active ? children : null;
        
};

export default ContentGate;