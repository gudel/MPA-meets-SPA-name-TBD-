import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//state structure definitions
interface UiState  {
    power : 'on' | 'off' | 'idle' ;
    scanlineVisible : boolean;
    navbarVisible : boolean;
    footerVisible : boolean;
    bootStatus: 'working' | 'idle';
}

//define initial state
const initialState: UiState = {
    power : 'off',
    scanlineVisible : false,
    navbarVisible : false,
    footerVisible : false,
    bootStatus: 'idle',
}

//create slices(??? This is inside of a slice.ts file? I don't get it)
const UiSlice = createSlice ({
    name: 'Ui',
    initialState,
    reducers: {
        // togglestates === ?? I don't understand this :/
        toggleNavbar: (state) => {
            state.navbarVisible = !state.navbarVisible;
        },
        toggleScanline: (state) => {
            state.scanlineVisible = !state.scanlineVisible;
        },
        toggleFooter: (state) => {
            state.footerVisible = !state.footerVisible;
        },
        setPower: (state, action: PayloadAction< 'on' | 'off' | 'idle' >) => {
            state.power = action.payload; //debug state, used for signal tracking
        },
        setBootStatus: (state, action: PayloadAction< 'idle' | 'working'>) => {
            state.bootStatus = action.payload;
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
    toggleNavbar,
    toggleScanline,
    toggleFooter,
    setPower,
    setBootStatus,
    setNavbarVisibility,
    setScanlineVisibility,
    setFooterVisibility,
} = UiSlice.actions;

export default UiSlice.reducer;