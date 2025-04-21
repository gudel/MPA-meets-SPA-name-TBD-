import { takeEvery, put, delay } from "redux-saga/effects";
import { powerSignal } from "../actions/actions";
import { setPower, setBootStatus, setNavbarVisibility, setScanlineVisibility, setFooterVisibility, toggleNavbar, toggleFooter, toggleScanline } from "../reducers/UiSlice";

function* handlePowerSignal(action: any) {
    console.log('saga screams:', action);
    console.log('navbar', setNavbarVisibility);

    const powerState = action.payload;

    yield put(setPower(powerState));

    //verbosity>abstraction. Intent is clear. black boxes are a scourge. This thing didn't run and I'm at my wits
    if (powerState === 'on') {
        yield put(setPower('on')); // internal state for debugging purposes
        yield put(setBootStatus('working')); // state tracking for debug
        yield put(setScanlineVisibility(true));
        yield delay(2000);
        yield put(setNavbarVisibility(true));
        yield delay(2000);
        yield put(setFooterVisibility(true));
        yield delay (2000);
        yield put(setPower('idle'));
        yield put(setBootStatus('idle'));
    } else {
        yield put(setPower('off'));
        yield put(setBootStatus('working'));
        yield put(setFooterVisibility(false));
        yield delay(1000);
        yield put(setNavbarVisibility(false));
        yield delay(1000);
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