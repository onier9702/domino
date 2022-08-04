
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import '../styles/computerPlayer.css';

import { determinateSideAndFindChip, setFindedChip, startDeleteChip, startResetGame } from '../slices/dataPlayers/thunks';
import { setChipId } from '../slices/gameController/controllerSlice';
import { setTiedGame, setTurnOffComputer, setTurnOffTiedGame } from '../slices/ui/uiSlice';
import { logicComputer } from '../helpers/logicComputer';
import { whoWinTiedGame } from '../helpers/whoWin';

export const Computer = () => {

    const dispatch = useDispatch();
    const { turnComputer, tied } = useSelector( state => state.ui);
  
    const { initialDataPlayer1, initialDataPlayer2 } = useSelector( state => state.data);
    const { value, table, pastValue, chipSel, id } = useSelector( state => state.count);
  
    // const [showButton, setShowButton] = useState(false);
    const [condit, setCondit] = useState(false);

    useEffect(() => { 
      
        if (turnComputer){
            handleSeeChips();/*.then( resp => () => {} ).catch( err => console.log(err))*/
            const msg = logicComputer( initialDataPlayer1, value);
            if ( msg.ok ){
                console.log('Inside');
                if ( msg.cond ){
                    dispatch( setChipId(msg.chipId) );
                    setCondit(true);
                    console.log('exists cond');
                    console.log(msg.cond);
                    
                    return ;
                } else {
                    return handleClickChip(msg.chipId);
                };
                
            } else {
                handlePassNextTurn()/*.then( resp => () => {} ).catch( err => console.log(err))*/
            }
        }
      
    }, [turnComputer])
    
  
    useEffect(() => {
        
        if (condit){

            console.log('useEffect Cond called');
            // console.log(condit.length);
            let chipOtherWay;
            if(id){
                const {chip} = dispatch( determinateSideAndFindChip(value, id, initialDataPlayer1, undefined, 'Right') );
                chipOtherWay = chip;
            }
          
            dispatch( setFindedChip( chipOtherWay, 'Right', table, value ) );
            // console.log(chipOtherWay);
            // console.log(condit);
          
            //   setShowButton(false);
            dispatch( startDeleteChip( id, 'player1' ));
            // dispatch( setTurnOffComputer());
            // setOneTurn();
            handlePassNextTurn();

        }
      
    }, [setCondit, condit])
    
  
    const handleClickChip = (ident = '') => { 
      
        // if ( !oneTurn ){
        //     console.log('Already was clicked');
        //     return;
        // }
        // dispatch( setOneTurn());
        // console.log('Ya juge');
        //   const id = e.target.id;
        dispatch( setChipId(ident));
        // console.log(ident);
        // console.log(initialDataPlayer1);
        const {msg, chip} = dispatch( determinateSideAndFindChip(value, ident, initialDataPlayer1,undefined, undefined) );
        console.log(msg);    
  
        switch (msg) {
            // case 'Both':
            //     setShowButton(true);

            //     break;
            
            case 'Left':
                dispatch( setFindedChip( chip, 'Left', table, value ) );
                dispatch( startDeleteChip( ident, 'player1' ));

                handlePassNextTurn();


                break;
            
            case 'Right':
                dispatch( setFindedChip( chip, 'Right', table, value ) );
                dispatch( startDeleteChip( ident, 'player1' ));

                handlePassNextTurn();


                break;
            
            // case 'First Strike':
            //     dispatch( setFindedChip( chip, 'First Strike', table, value ) );
            //     dispatch( startDeleteChip( ident, 'player1' ));

            //     break;
            
            case 'Pass':
                break;
        };
  
        // dispatch( setOneTurn());
  
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
            console.log('m' + m);
            if ( (tied === 50) && (!m) ){
                
                const { winner, count1, count2 } = whoWinTiedGame(initialDataPlayer1, initialDataPlayer2);
                switch (winner) {
                  case 'Computer':
                    Swal.fire('Sorry', `Computer won: \n Computer: ${count1}points \n You: ${count2}points`, 'info' );
                    break;
                  case 'Player':
                    Swal.fire('Felicidades', `You win: Computer: ${count1}points  You: ${count2}points`, 'success' );
                    break;
                  case 'tied':
                    Swal.fire('Tied Game o Juego Empatado', `Computer: ${count1}points  You: ${count1}points`, 'info' );
                    break;
                
                  default:
                    break;
                };
                return dispatch( startResetGame() );
                
            };
            if ( (tied === 50) && m ){
                dispatch( setTurnOffTiedGame() );
                console.log('In handleSeeChips i turn off tied game');
            };
            if ( !m ){
              dispatch( setTiedGame());
              console.log('In handleSeeChips i set tied game');
            };
  
        };
  
    };
  
    const handlePassNextTurn = () => {
  
        if (initialDataPlayer1.length === 0){
            dispatch( startResetGame());
            dispatch( setTurnOffComputer());
            return Swal.fire('Sorry', 'Computer has won', 'success');
        };

        if (condit){
            setCondit(false);
        };
    //   setShowPlayerChips(false);
        setTimeout(() => {
            dispatch( setTurnOffComputer());
        }, 2000);
    //   dispatch( setOffOneTurn());
    };
  
  
    return (
  
      <div   >
          <div className="Computer">
            <h2>Computer</h2>
            {/* <button type="button" onClick={handlePassNextTurn} >Next Turn</button> */}
          </div>
  
          <div className="list-chips" /*style={{display: (turnComputer) ? 'flex' : 'none' }}*/ >
              <div className="slider">
                  <ul>
                      {
                          // Here is 6 blank chip
                      }
                  </ul>
                  
              </div>
          </div>
      </div>
    )

}
