import { configureStore, Store } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import {rootSaga} from './rootSaga'

console.log("saga signal", rootSaga)

const sagaMiddleWare = createSagaMiddleware();

export const makeStore = () => {
    const store = configureStore ({
        reducer: rootReducer,
        middleware: (getDefaultMiddleWare) =>
            getDefaultMiddleWare({thunk:false}).concat(sagaMiddleWare),
    });

    sagaMiddleWare.run(rootSaga);
    return store;
};



export const store = makeStore();

//infer the type of makestore
export type AppStore = ReturnType<typeof makeStore>
//infer the 'RootState' and 'AppDispatch' types from the store itself (doesnt make sense for the moment to me.).
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

//Stuck on trying to define the states that should be stored here...