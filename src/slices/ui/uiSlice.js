
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   turnComputer: null,
   tied: 0,
   // oneTurn: true,
   both: false,
   endGame: false,
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

      setTurnComputer: (state) => {
         state.turnComputer = true;
      },

      setTurnOffComputer: (state) => {
         state.turnComputer = false;
      },

      setTiedGame: (state) => {
         state.tied += 50;
      },
      setTurnOffTiedGame: (state) => {
         state.tied = 0;
      },

      setEndGame: (state) => {
         state.endGame = true;
      },
      setOffEndGame: (state) => {
         state.endGame = false;
      },

      // setOneTurn: (state) => {
      //    state.oneTurn = !state.oneTurn;
      // },
      // setOffOneTurn: (state) => {
      //    state.oneTurn = true;
      // },

      resetUi: (state) => {
         state.turnComputer = null;
         state.tied = 0;
         state.endGame = false;
         state.both = false;
         // state.oneTurn = true;
      },

  },
})

export const { setBothTrue, 
               setBothFalse, 
               setTurnComputer, 
               setTurnOffComputer,
               resetUi, 
               setTiedGame,
               setTurnOffTiedGame,
               setEndGame,
               setOffEndGame,
               // setOneTurn,
               
               
               /*setTurnPlayer2, 
               setTurnOffPlayer2 */ } = uiSlice.actions;