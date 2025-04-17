import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
    return configureStore ({
        reducer: {},
    })
}

//infer the type of makestore
export type AppStore = ReturnType<typeof makeStore>
//infer the 'RootState' and 'AppDispatch' types from the store itself (doesnt make sense for the moment to me.).
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']