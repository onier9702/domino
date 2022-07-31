
import { createSlice } from '@reduxjs/toolkit';


/*
    [
        4,  // first header is 4
        6   // second header is 6
    ]
*/

const initialState = {
    id: '',
    pastValue: [],
    chipSel: [],
    value: [],
    table: [],
}

export const controllerSlice = createSlice({
   name: 'controller',
   initialState,
   reducers: {

    setCount: (state, action) => {
        state.pastValue = state.value;
        state.value = action.payload;
    },

    setChipSel: (state, action) => {
        state.chipSel = action.payload;
    },

    setChipId: (state, action) => {
        state.id = action.payload;
    },

    setTableChip: (state, action) => {
        state.table = action.payload;
    }

    // setLeftChip: (state, action) => {
    //     console.log(action.payload);
    //     state.table = action.payload;
    // },

    // setRightChip: (state, action) => {
    //     console.log(action.payload);
    //     state.table = action.payload;
    // },
    // setFirstChip: (state, action) => {
    //     console.log(action.payload);
    //     state.table = action.payload;
    // },

  },
})

export const { setCount, setTableChip, setChipSel, setChipId } = controllerSlice.actions;