import { takeEvery, put, delay } from "redux-saga/effects";
import { powerSignal } from "../actions/actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { setPower, setBootStatus, setNavbarVisibility, setScanlineVisibility, setFooterVisibility, setContentGateVisible, setBootScreenVisibility } from "../reducers/UiSlice";

function* handlePowerSignal(action: PayloadAction<'on'|'off'>) {
    console.log('saga screams:', action);
    console.log('navbar', setNavbarVisibility);

    const powerState = action.payload;

    yield put(setPower(powerState));

    //verbosity>abstraction. Intent is clear. black boxes are a scourge. 
    if (powerState === 'on') {
        yield put(setPower('on')); // internal state for debugging purposes
        yield put(setBootStatus('working')); // state tracking for debug
        yield delay(200);
        yield put(setScanlineVisibility(true));
        yield delay(800);
        yield put(setBootScreenVisibility(true));
        yield delay (200);
        yield put(setNavbarVisibility(true));
        yield delay(800);
        yield put(setFooterVisibility(true));
        yield delay (800);
        yield put(setBootScreenVisibility(false));
        yield delay (200);
        yield put(setContentGateVisible(true));
        yield put(setPower('idle'));
        yield put(setBootStatus('idle'));
    } else {
        yield put(setPower('off'));
        yield put(setBootStatus('working'));
        yield delay(200);
        yield put(setContentGateVisible(false));
        yield delay(200);
        yield put(setBootScreenVisibility(true));
        yield delay(1000);
        yield put(setFooterVisibility(false));
        yield delay(1000);
        yield put(setNavbarVisibility(false));
        yield delay(1000);
        yield put(setBootScreenVisibility(false));
        yield delay (200);
        yield put(setScanlineVisibility(false));     
        yield delay (1000);
        yield put(setPower('idle'));   
        yield put(setBootStatus('idle'));
    }
}


// reminder. exporting saga functions needs to be declared as generator (function*).
// I don't know why, the linter protests a lot with `function`.
// I would love to be corrected if this is the wrong pattern by a senior wizard.
export function* uiSaga() {
    yield takeEvery(powerSignal.type, handlePowerSignal);
}