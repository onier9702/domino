

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startNewGame } from '../slices/dataPlayers/thunks';

import '../styles/gameTableComputer.css'; 

export const GameComputer = () => {

  const dispatch = useDispatch();
  const {table = []} = useSelector(state => state.count);
  const {endGame} = useSelector(state => state.ui);

  const handleNewGame = () => {
    dispatch( startNewGame() );
  }


  return (
    <div className="gameTableComputer">

        {/* <h5>Here is going the game table</h5> */}

        <ul>
          {
            table.map( (chip, index) => (
              <li key={index}>
                <img src={process.env.PUBLIC_URL + `/assets/ficha${chip.chip[0]}-${chip.chip[1]}.png`} className={(chip.rotate) ? 'rotateImg' : ''}  id={(chip.rotate90) ? 'rotate90' : ''} alt={`ficha${index}`} />
              </li>
            ) )
          }
        </ul>

        {
          (endGame) && <button type="button" 
                               style={{border: 'none', backgroundColor: 'blue', color: 'white' }}
                               onClick={handleNewGame}
                        >Start New Game</button>
        }

    </div>
  )
}
