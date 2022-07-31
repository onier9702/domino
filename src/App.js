
// App.js of Domino App


import React from 'react';
import { useDispatch } from 'react-redux';

import './styles/app.css';

import { TablePlayer2 } from './components/TablePlayer2';
import { getTenChipsPlayers } from './helpers/getPlayersData';
import { setDataOnRedux } from './slices/dataPlayers/thunks';
import { TablePlayer1 } from './components/TablePlayer1';
import { Game } from './components/Game';


export const App = () => {

  const dispatch = useDispatch();
  
  const [ dataPlayer1, dataPlayer2 ]  = getTenChipsPlayers();
  dispatch( setDataOnRedux(dataPlayer1, dataPlayer2) );



  return (

    <div className="all">
        {/* <h2>Dominoes App</h2> */}

        <TablePlayer1 />

        <Game />

        <TablePlayer2 />

    </div>
  )
}


