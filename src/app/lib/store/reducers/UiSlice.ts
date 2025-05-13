import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//state structure definitions
interface UiState  {
    power : 'on' | 'off' | 'idle' ; //saga activity tracker
    scanlineVisible : boolean;
    navbarVisible : boolean;
    footerVisible : boolean;
    contentGateVisible: boolean;
    bootScreenVisible: boolean;
    bootStatus: 'working' | 'idle'; //bug tracker, internal
}

//define initial state
const initialState: UiState = {
    power : 'off',
    scanlineVisible : false,
    navbarVisible : false,
    footerVisible : false,
    bootScreenVisible: false,
    contentGateVisible : false,
    bootStatus: 'idle',
}

//create slices(??? This is inside of a slice.ts file? I don't get it)
const UiSlice = createSlice ({
    name: 'Ui',
    initialState,
    reducers: {
        setContentGateVisible: (state, action:PayloadAction<boolean>) => {
            state.contentGateVisible = action.payload;
        },
        setPower: (state, action: PayloadAction< 'on' | 'off' | 'idle' >) => {
            state.power = action.payload; //debug state, used for signal tracking
        },
        setBootStatus: (state, action: PayloadAction< 'idle' | 'working'>) => {
            state.bootStatus = action.payload; //BootWorkerStatus.
        },
        setBootScreenVisibility: (state, action: PayloadAction<boolean>) => {
            state.bootScreenVisible = action.payload; //saga says this is not an action?
        },
        setNavbarVisibility: (state, action: PayloadAction<boolean>) => {
            state.navbarVisible = action.payload;
            console.log('Reducer hit: setNavbar', action.payload);
        },
        setScanlineVisibility: (state, action: PayloadAction<boolean>) => {
            state.scanlineVisible = action.payload;
        },
        setFooterVisibility: (state, action: PayloadAction<boolean>) => {
            state.footerVisible = action.payload;
        },
    }
});

export const {
    setPower,
    setBootStatus,
    setNavbarVisibility,
    setScanlineVisibility,
    setFooterVisibility,
    setBootScreenVisibility,
    setContentGateVisible,
} = UiSlice.actions;

export default UiSlice.reducer;