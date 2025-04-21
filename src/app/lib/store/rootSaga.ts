import { all } from "redux-saga/effects";
import { uiSaga } from "./sagas/bootSaga";

export function* rootSaga () {
    console.log('rootsaga.init', true)
    yield all ([
        uiSaga(),
    ]);
};

