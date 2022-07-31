
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   initialDataPlayer1: [],
   initialDataPlayer2: [],
}

export const dataSlice = createSlice({
   name: 'data',
   initialState,
   reducers: {

   setInitialDataPlayer: (state, action) => {
      state.initialDataPlayer1 = action.payload.player1;
      state.initialDataPlayer2 = action.payload.player2;
   },

   deleteChipById: (state, action) => {
      if ( action.payload.player === 'player1'){
         state.initialDataPlayer1 = state.initialDataPlayer1.filter( chip => chip.id !== action.payload.id );
      } else {
         state.initialDataPlayer2 = state.initialDataPlayer2.filter( chip => chip.id !== action.payload.id );
      }
   },

  },
})

export const { setInitialDataPlayer, deleteChipById } = dataSlice.actions;