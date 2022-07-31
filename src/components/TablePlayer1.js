
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import '../styles/tablePlayer2.css';
import { determinateSideAndFindChip, setFindedChip, startDeleteChip } from '../slices/dataPlayers/thunks';
import { setChipId } from '../slices/gameController/controllerSlice';

export const TablePlayer1 = () => {

  const dispatch = useDispatch();
  const { initialDataPlayer1 } = useSelector( state => state.data);
  const { value, table, pastValue, chipSel, id } = useSelector( state => state.count);
//   const { both } = useSelector( state => state.ui);
  const [showButton, setShowButton] = useState(false);
  const [condit, setCondit] = useState('');

  useEffect(() => {

    dispatch( startDeleteChip( id, 'player1' ));
    // console.log(id);
    let chipOtherWay;
    if(id){
      const {chip} = dispatch( determinateSideAndFindChip(value, id, undefined, initialDataPlayer1, condit) );
      chipOtherWay = chip;
    }
    
    dispatch( setFindedChip( chipOtherWay, condit, table, value ) );
    // console.log(chipOtherWay);
    setShowButton(false);
    
  }, [setCondit, condit])
  

  const handleClickChip = (e) => { 
    
    const id = e.target.id;
    dispatch( setChipId(id));
    const {msg, chip} = dispatch( determinateSideAndFindChip(value, id, undefined, initialDataPlayer1, undefined) )
    console.log(msg);    
    // console.log(condition);

    switch (msg) {
      case 'Both':
          setShowButton(true);
          
          break;

      case 'Left':
          dispatch( setFindedChip( chip, 'Left', table, value ) );
          dispatch( startDeleteChip( id, 'player1' ));
          break;

      case 'Right':
          dispatch( setFindedChip( chip, 'Right', table, value ) );
          dispatch( startDeleteChip( id, 'player1' ));
          break;

      case 'First Strike':
          dispatch( setFindedChip( chip, 'First Strike', table, value ) );
          dispatch( startDeleteChip( id, 'player1' ));
          break;

      case 'Pass':
          break;
    };
  };


  return (

    <div /*className="portionTable"*/  >
        <h2 style={{color: 'red'}}>Computer</h2>
        <div className="list-chips">
            <div className="slider">
                {/* <button></button> */}
                <ul>
                    {
                        initialDataPlayer1.map( (e, index) => (
                                <li key={e.id}>

                                  <img src={process.env.PUBLIC_URL + `/assets/ficha${e.chip[0]}-${e.chip[1]}.png`} id={e.id} onClick={handleClickChip} alt={`ficha${index}`} />
                                    
                                </li>
                        ) )
                    }
                </ul>
                {
                    (showButton) && 
                                    <ul className="ulBtn">
                                        <li>
                                            <button onClick={() => setCondit('Left')}>Play Up</button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCondit('Right')}>Play Down</button>
                                        </li>
                                    </ul> 
                }
            </div>
        </div>
    </div>
  )
}
