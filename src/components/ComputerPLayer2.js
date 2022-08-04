

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import '../styles/tablePLayer2Computer.css';
import { determinateSideAndFindChip, setFindedChip, startDeleteChip, startResetGame } from '../slices/dataPlayers/thunks';
import { setChipId } from '../slices/gameController/controllerSlice';
import { setTiedGame, setTurnComputer, setTurnOffTiedGame } from '../slices/ui/uiSlice';
import Swal from 'sweetalert2';
import { hasPlayerAnyValidChip } from '../helpers/hasPLayerValidChip';
import { whoWinTiedGame } from '../helpers/whoWin';

export const Player2Computer = () => {

  const dispatch = useDispatch();
  const { turnComputer, tied } = useSelector( state => state.ui);
  const { initialDataPlayer1, initialDataPlayer2 } = useSelector( state => state.data);
  const { value, table, pastValue, chipSel, id } = useSelector( state => state.count);

  const [showButton, setShowButton] = useState(false);
  const [condit, setCondit] = useState('');
  const [wasValidClick, setWasValidClick] = useState(false);
  const [oneTurn, setOneTurn] = useState(true);

  useEffect(() => {

    if (value.length === 0){
      setOneTurn(true);
    }
  
  }, [oneTurn, setOneTurn])

  useEffect(() => {

    // console.log(id);
    if (condit !== ''){

      let chipOtherWay;
      if(id){
        const {chip} = dispatch( determinateSideAndFindChip(value, id,undefined, initialDataPlayer2, condit) );
        chipOtherWay = chip;
      }
      
      dispatch( setFindedChip( chipOtherWay, condit, table, value ) );
      // console.log(chipOtherWay);
      setShowButton(false);
      dispatch( startDeleteChip( id, 'player2' ));
      setCondit('');
      // dispatch( setTurnOffComputer());

    }
    
  }, [setCondit, condit])
  

  const handleClickChip = (e) => { 
    
    if ( !oneTurn ){
      return;
    }
    const id = e.target.id;
    
    const chipSelect = initialDataPlayer2.find( e => e.id === id );
    let chipClicked = chipSelect.chip;
    console.log(chipClicked);
    if ( chipClicked[0] === value[0] || chipClicked[0] === value[1] || chipClicked[1] === value[0] || chipClicked[1] === value[1] || value.length === 0){
      dispatch( setChipId(id));
      const {msg, chip} = dispatch( determinateSideAndFindChip(value, id, undefined, initialDataPlayer2, undefined) )
      console.log(msg);    
      // console.log(condition);
  
      switch (msg) {
        case 'Both':
            setShowButton(true);
            // console.log('here I put turn on true, case Both');
            setOneTurn(false);
            // dispatch( setOneTurn());
            setWasValidClick(true); // a chip was selected correctly

            break;
  
        case 'Left':
            dispatch( setFindedChip( chip, 'Left', table, value ) );
            dispatch( startDeleteChip( id, 'player2' ));
            setOneTurn(false);
            // dispatch( setOneTurn());
            setWasValidClick(true); // a chip was selected correctly
            // dispatch( setTurnOffComputer());
            break;
  
        case 'Right':
            dispatch( setFindedChip( chip, 'Right', table, value ) );
            dispatch( startDeleteChip( id, 'player2' ));
            setOneTurn(false);
            // dispatch( setOneTurn());
            setWasValidClick(true); // a chip was selected correctly
            // dispatch( setTurnOffComputer());
            break;
  
        case 'First Strike':
            dispatch( setFindedChip( chip, 'First Strike', table, value ) );
            dispatch( startDeleteChip( id, 'player2' ));
            setOneTurn(false);
            // dispatch( setOneTurn());
            setWasValidClick(true); // a chip was selected correctly
            // dispatch( setTurnOffComputer());
            break;
  
        case 'Pass':
            break;
      };

      
    } else {
      if ( value[0] ){
        if ( !hasPlayerAnyValidChip( value, initialDataPlayer2) ){
            setWasValidClick(true);
        };
      };
    };

    

  };

  // Verify if tied game
  useEffect(() => {
    
    if (!turnComputer){

      if ( value[0] ){
    
        let m = false;
        initialDataPlayer2.map( e => {  // To verify if game was tied
            for ( let i = 0; i< 2; i++){
                for ( let j = 0;j<2; j++){
    
                    if ( e.chip[i] === value[j] ){
                        m = true;
                        break;
                    }
                }
            };
        });
        // console.log('PLayer 2 , M: ' + m);
        if ( (tied === 50) && (!m) ){
            const { winner, count1, count2 } = whoWinTiedGame(initialDataPlayer1, initialDataPlayer2);
            switch (winner) {
              case 'Computer':
                Swal.fire('Computer win', `Statistics:  Computer: ${count1}points  You: ${count2}points`, 'info' );
                break;
              case 'Player':
                Swal.fire('You win', `: Statistics\n Computer: ${count1}points \n You: ${count2}points`, 'success' );
                break;
              case 'tied':
                Swal.fire('Tied Game o Juego Empatado', `Computer: ${count1}points  You: ${count1}points`, 'info' );
                break;
            
              default:
                break;
            };

            setOneTurn(true);
            dispatch( startResetGame() );
            return;
        };
        if ( (tied === 50) && m ){
            dispatch( setTurnOffTiedGame() );
            // console.log('I turn off setTiedGame');
        };
        if ( !m ){
          // console.log('PLayer2 , I put tied game');
          dispatch( setTiedGame());
        };
    
      };

    }
    
  }, [turnComputer]);
  

  const handlePassNextTurn = () => {

    if (initialDataPlayer2.length === 0){
      dispatch( startResetGame());
      setOneTurn(true);
      return Swal.fire('You Win', 'Congrats', 'success');
    }
    // setShowPlayerChips(false);
    dispatch( setTurnComputer());
    // new code added here
    if ( value[0] ){
      if ( !hasPlayerAnyValidChip( value, initialDataPlayer2) ){
        if ( !oneTurn ){
          setOneTurn(true);
        }
        if ( wasValidClick ){
          setWasValidClick(false);
        }
        return;
  
      };
    };
    if ( value[0] && wasValidClick){
      setOneTurn(true);
      setWasValidClick(false);
      return;
    };

    if ( !oneTurn ){
      setOneTurn(true);
    }

    setWasValidClick(false);
    
  };

  const clickPlayUp = () => {
      // console.log('Play Up clicked');
      setCondit('Left');
  };

  const clickPlayDown = () => {
      // console.log('Play Down clicked');
      setCondit('Right');
      // console.log(condit);
  };

  // if ( !showPlayerChips ){
  //   return (
  //     <div className="seeChips">
  //       <h2>Player1</h2>
  //       <button type="button" onClick={handleSeeChips} >See My Chips</button>
  //     </div>
  //   )
  // }


  return (

    <div   >
        <div className="seeChips">
          <h2>Player</h2>
          {
            (!turnComputer) && <button type="button" onClick={handlePassNextTurn} >Next Turn</button>
          }
          
        </div>

        <div className="list-chips" /*style={{display: (turnComputer) ? 'flex' : 'none' }}*/ >
            {/* <h2>Player</h2> */}
            <div className="slider">
                {/* <button></button> */}
                <ul>
                    {
                        initialDataPlayer2.map( (e, index) => (
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
