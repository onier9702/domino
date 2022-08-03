
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { App } from './App';
import { ComputerApp } from './ComputerApp';
import { SelectorGame } from './SelectorGame';

export const AppRouter = () => {


  return (
    <div>

        <Routes>

            <Route path="/" element={ <SelectorGame /> } />
            <Route path="/twoPlayers" element={ <App /> } />
            <Route path="/siglePlayer" element={ <ComputerApp /> } />

            

        </Routes>

    </div>
  )
}
