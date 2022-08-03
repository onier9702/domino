

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import '../styles/tablePlayer2.css';
import { determinateSideAndFindChip, setFindedChip, startDeleteChip, startResetGame } from '../slices/dataPlayers/thunks';
import { setChipId } from '../slices/gameController/controllerSlice';
import { setOffOneTurn, setOneTurn, setTiedGame, setTurnOffComputer, setTurnOffTiedGame } from '../slices/ui/uiSlice';
import Swal from 'sweetalert2';
import { hasPlayerAnyValidChip } from '../helpers/hasPLayerValidChip';

export const Player2Computer = () => {

  const dispatch = useDispatch();
  const { turnComputer, tied, oneTurn } = useSelector( state => state.ui);

  const { initialDataPlayer1 } = useSelector( state => state.data);
  const { value, table, pastValue, chipSel, id } = useSelector( state => state.count);
//   const { both } = useSelector( state => state.ui);
  const [showButton, setShowButton] = useState(false);
  const [condit, setCondit] = useState('');
  const [showPlayerChips, setShowPlayerChips] = useState(false);
  const [wasValidClick, setWasValidClick] = useState(false);

  useEffect(() => {

    // console.log(id);
    if (condit !== ''){

      let chipOtherWay;
      if(id){
        const {chip} = dispatch( determinateSideAndFindChip(value, id, initialDataPlayer1, undefined, condit) );
        chipOtherWay = chip;
      }
      
      dispatch( setFindedChip( chipOtherWay, condit, table, value ) );
      // console.log(chipOtherWay);
      setShowButton(false);
      dispatch( startDeleteChip( id, 'player1' ));
      setCondit('');
      // dispatch( setTurnOffComputer());

    }
    
  }, [setCondit, condit])
  

  const handleClickChip = (e) => { 
    
    if ( !oneTurn ){
      return;
    }
    const id = e.target.id;
    
    const chipSelect = initialDataPlayer1.find( e => e.id === id );
    let chipClicked = chipSelect.chip;
    if ( chipClicked[0] === value[0] || chipClicked[0] === value[1] || chipClicked[1] === value[0] || chipClicked[1] === value[1] || value.length === 0){
      dispatch( setChipId(id));
      const {msg, chip} = dispatch( determinateSideAndFindChip(value, id, undefined, initialDataPlayer1, undefined) )
      console.log(msg);    
      // console.log(condition);
  
      switch (msg) {
        case 'Both':
            setShowButton(true);
            console.log('here I put turn on true, case Both');
            dispatch( setOneTurn());
            setWasValidClick(true); // a chip was selected correctly

            break;
  
        case 'Left':
            dispatch( setFindedChip( chip, 'Left', table, value ) );
            dispatch( startDeleteChip( id, 'player1' ));
            dispatch( setOneTurn());
            setWasValidClick(true); // a chip was selected correctly
            // dispatch( setTurnOffComputer());
            break;
  
        case 'Right':
            dispatch( setFindedChip( chip, 'Right', table, value ) );
            dispatch( startDeleteChip( id, 'player1' ));
            dispatch( setOneTurn());
            setWasValidClick(true); // a chip was selected correctly
            // dispatch( setTurnOffComputer());
            break;
  
        case 'First Strike':
            dispatch( setFindedChip( chip, 'First Strike', table, value ) );
            dispatch( startDeleteChip( id, 'player1' ));
            dispatch( setOneTurn());
            setWasValidClick(true); // a chip was selected correctly
            // dispatch( setTurnOffComputer());
            break;
  
        case 'Pass':
            break;
      };

      
    } else {
      if ( value[0] ){
        if ( !hasPlayerAnyValidChip( value, initialDataPlayer1) ){
            setWasValidClick(true);
        };
      };
    };

    

  };

  const handleSeeChips = () => {
  
    if ( value[0] ){

      let m = false;
      initialDataPlayer1.map( e => {  // To verify if game was tied
          for ( let i = 0; i< 2; i++){
              for ( let j = 0;j<2; j++){

                  if ( e.chip[i] === value[j] ){
                      m = true;
                      break;
                  }
              }
          };
      });
      if ( (tied === 50) && (!m) ){
          dispatch( startResetGame() );
          return Swal.fire('Tied Game o Juego Empatado', 'The Game was stuck or tied', 'info' );
      };
      if ( (tied === 50) && m ){
          dispatch( setTurnOffTiedGame() );
      };
      if ( !m ){
        dispatch( setTiedGame());
      };

    };

    if ( (turnComputer === null) || turnComputer ){
        return setShowPlayerChips(true);
    } else {
        return Swal.fire('Player1 is Not your Turn', 'Please wait until your turn', 'warning');
    };
  };

  const handlePassNextTurn = () => {

    if (initialDataPlayer1.length === 0){
      dispatch( startResetGame());
      return Swal.fire('Felicidades', 'Player 1 has won', 'success');
    }
    setShowPlayerChips(false);
    dispatch( setTurnOffComputer());
    // new code added here
    if ( value[0] ){
      if ( !hasPlayerAnyValidChip( value, initialDataPlayer1) ){
        if ( !oneTurn ){
          dispatch(setOneTurn());
        }
        if ( wasValidClick ){
          setWasValidClick(false);
        }
        return;
  
      };
    };
    if ( value[0] && wasValidClick){
      dispatch( setOneTurn());
    };

    setWasValidClick(false);
    
  };

  const clickPlayUp = () => {
      console.log('Play Up clicked');
      setCondit('Left');
  };

  const clickPlayDown = () => {
      console.log('Play Down clicked');
      setCondit('Right');
      console.log(condit);
  };

  if ( !showPlayerChips ){
    return (
      <div className="seeChips">
        <h2>Player1</h2>
        <button type="button" onClick={handleSeeChips} >See My Chips</button>
      </div>
    )
  }


  return (

    <div   >
        <div className="seeChips">
          <h2>Player1</h2>
          <button type="button" onClick={handlePassNextTurn} >Next Turn</button>
        </div>

        <div className="list-chips" /*style={{display: (turnComputer) ? 'flex' : 'none' }}*/ >
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
                                            <button onClick={clickPlayUp}>Play Up</button>
                                        </li>
                                        <li>
                                            <button onClick={clickPlayDown}>Play Down</button>
                                        </li>
                                    </ul> 
                }
            </div> 
        </div>
    </div>
  )
}