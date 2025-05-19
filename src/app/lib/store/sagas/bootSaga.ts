import { put, delay, takeLatest } from "redux-saga/effects";
import { powerSignal } from "../actions/actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { setPower, setBootStatus, setNavbarVisibility, setScanlineVisibility, setFooterVisibility, setContentGateVisible, setBootScreenVisibility } from "../reducers/UiSlice";

const timing = {
    bootStatus : 200,
    scanline : 800,
    components: 600,
}
function* handlePowerSignal(action: PayloadAction<'on'|'off'>) {  
    const powerState = action.payload;
    //verbosity>abstraction. 
    //delay === ms
    //BIOS like sequence orchestration. Imperative atomic logic.
    //Refer to [4/12/2025] entry in debug.log.md for flow sequence.
    //powerState !== setPower. powerState === action.ts. setPower === reducer.
    if (powerState === 'on') { 
        yield put(setPower('on')); // internal state for debugging purposes. 
        yield put(setBootStatus('working')); //second buffer, turns off powerButton mid sequence.
        yield delay(timing.bootStatus);
        yield put(setScanlineVisibility(true));
        yield delay(timing.scanline);
        yield put(setBootScreenVisibility(true));
        yield delay (timing.components);
        yield put(setNavbarVisibility(true));
        yield delay(timing.components);
        yield put(setFooterVisibility(true));
        yield delay (timing.components);
        yield put(setBootScreenVisibility(false));
        yield delay (timing.bootStatus);
        yield put(setContentGateVisible(true));
        yield put(setPower('idle'));
        yield put(setBootStatus('idle')); //idle === task complete. unlock powerbutton, system standby.
    } else {
        yield put(setPower('off'));
        yield put(setBootStatus('working'));
        yield delay(timing.bootStatus);
        yield put(setContentGateVisible(false));
        yield delay(timing.components);
        yield put(setBootScreenVisibility(true));
        yield delay(timing.components);
        yield put(setFooterVisibility(false));
        yield delay(timing.components);
        yield put(setNavbarVisibility(false));
        yield delay(timing.components);
        yield put(setBootScreenVisibility(false));
        yield delay (timing.scanline);
        yield put(setScanlineVisibility(false));     
        yield delay (timing.bootStatus);
        yield put(setPower('idle'));   
        yield put(setBootStatus('idle'));
    }
}


// reminder. exporting saga functions needs to be declared as generator (function*).
// I don't know why, the linter protests a lot with `function`.
// I would love to be corrected if this is the wrong pattern by a senior wizard.
export function* uiSaga() {
    yield takeLatest(powerSignal.type, handlePowerSignal); //ensure no action spam relative to user actions.
    //yield takeEvery(powerSignal.type, handlePowerSignal); //default behavior is not hardened against click spams.
}