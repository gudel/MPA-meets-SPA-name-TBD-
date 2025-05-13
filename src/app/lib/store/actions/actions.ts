import { createAction } from "@reduxjs/toolkit";


// Signal-only, does not care about state
export const powerSignal = createAction< 'on' | 'off' >('ui/powerSignal');
