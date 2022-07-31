
import { configureStore } from '@reduxjs/toolkit';
import { dataSlice } from '../slices/dataPlayers/dataSlice';
import { controllerSlice } from '../slices/gameController/controllerSlice';
import { uiSlice } from '../slices/ui/uiSlice';

export const store = configureStore({
  reducer: {

    ui: uiSlice.reducer,
    data: dataSlice.reducer,
    count: controllerSlice.reducer,
    
  },
})