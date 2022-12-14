
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles/app.css';

import { Computer } from './components/Computer';
import { Player2Computer } from './components/ComputerPLayer2';
import { GameComputer } from './components/GameComputer';
import { getTenChipsPlayers } from './helpers/getPlayersData';
import { setDataOnRedux } from './slices/dataPlayers/thunks';



export const ComputerApp = () => {
    
    const dispatch = useDispatch();
    const [ dataPlayer1, dataPlayer2 ]  = getTenChipsPlayers();
    dispatch( setDataOnRedux(dataPlayer1, dataPlayer2) );



  return (

        <div className="all">
            <Link to="/" style={{color: 'yellowgreen', paddingTop: 15}} > Go Home</Link>
            {/* <h2>Computer App</h2> */}

            {/* <TablePlayer1 /> */}
            <Computer />

            <GameComputer />

            <Player2Computer />

        </div>
    )
}
