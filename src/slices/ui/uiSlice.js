
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   both: false,
}

export const uiSlice = createSlice({
   name: 'ui',
   initialState,
   reducers: {
    setBothTrue: (state) => {
       state.both = true;
    },

    setBothFalse: (state) => {
        state.both = false;
     },

  },
})

export const { setBothTrue, setBothFalse } = uiSlice.actions;