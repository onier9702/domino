
import React from 'react';
import { useSelector } from 'react-redux';

import '../styles/gameTable.css'; 

export const Game = () => {

  const {table = []} = useSelector(state => state.count);

  return (
    <div className="gameTable">

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

    </div>
  )
}
