'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore, store} from './lib/store/store'


//making sure the client component is re-render safe by checking value of reference. ensure its only created once.
export default function StoreProvider ({
    children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(store)
    if (!storeRef.current) {
        //create the store instance the first time this renders.
        storeRef.current = makeStore()
    }
    
    return <Provider store={storeRef.current}>{children}</Provider>
}

