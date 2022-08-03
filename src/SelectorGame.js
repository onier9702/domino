
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/SelectorGame.css';

export const SelectorGame = () => {

    const navigate = useNavigate();  // TODO: install react-router-dom
    const playTwoPlayers = () => {
        navigate('/twoPlayers');
    };

    const playSinglePlayer = () => {
        // navigate('/siglePlayer');
        console.log('singlePlayer still in development mode');
    };

  return (
    <div className="selectorGame">
        <h1>Select Game mode</h1>

        <button className="btnTypeGame"
                type="button"
                onClick={playTwoPlayers}
        >Two Players</button>

        <h4>Still Developing, it will be finish as soon as posible</h4>
        <button className="btnTypeGame"
                type="button"
                onClick={playSinglePlayer}
                disabled="true"
        >Single Player</button>

        <div className="info">
            <div className="info-cuadro">
                <h3>To Play in mode Two Players</h3>
                <p>  -- You and any friend, both can start play a dominoes data</p>
            </div>
            <div className="info-cuadro">
                <h3>To Play in mode Single Player</h3>
                <p>  -- Just play against the computer, just one player is required</p>
            </div>
        </div>


    </div>
  )
}
