
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { determinateSideAndFindChip, setFindedChip, startDeleteChip, startResetGame } from '../slices/dataPlayers/thunks';
import { setChipId } from '../slices/gameController/controllerSlice';
import { setOffOneTurn, setOneTurn, setTiedGame, setTurnOffComputer, setTurnOffTiedGame } from '../slices/ui/uiSlice';
import { logicComputer } from '../helpers/logicComputer';

export const Computer = () => {

    const dispatch = useDispatch();
    const { turnComputer, tied, oneTurn } = useSelector( state => state.ui);
  
    const { initialDataPlayer1 } = useSelector( state => state.data);
    const { value, table, pastValue, chipSel, id } = useSelector( state => state.count);
  
    const [showButton, setShowButton] = useState(false);
    const [condit, setCondit] = useState('');

    useEffect(() => { 
      
        if (turnComputer){
            handleSeeChips()/*.then( resp => () => {} ).catch( err => console.log(err))*/
            const msg = logicComputer( initialDataPlayer1, value,);
            if ( msg.ok ){
                console.log('Inside');
                if ( msg.cond ){
                    dispatch( setChipId(msg.chipId) );
                    setCondit( 'Right' );
                    console.log('exists cond');
                    console.log(msg.cond);
                    
                    return ;
                } else {
                    handleClickChip(msg.chipId);
                };
                
            } else {
                handlePassNextTurn()/*.then( resp => () => {} ).catch( err => console.log(err))*/
            }
        }
      
    }, [turnComputer])
    
  
    useEffect(() => {
        
        if (condit.length > 0){

            console.log('useEffect Cond called');
            let chipOtherWay;
            if(id){
              const {chip} = dispatch( determinateSideAndFindChip(value, id, initialDataPlayer1, undefined, condit) );
              chipOtherWay = chip;
            }
          
            dispatch( setFindedChip( chipOtherWay, condit, table, value ) );
            console.log(chipOtherWay);
            console.log(condit);
          
            //   setShowButton(false);
            dispatch( startDeleteChip( id, 'player1' ));
            // dispatch( setTurnOffComputer());
            // setOneTurn();
            handlePassNextTurn();

        }
      
    }, [setCondit, condit])
    
  
    const handleClickChip = (ident = '') => { 
      
        if ( !oneTurn ){
            console.log('Already was clicked');
            return;
        }
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
          return /*setShowPlayerChips(true)*/;
      } else {
          return Swal.fire('Player1 is Not your Turn', 'Please wait until your turn', 'warning');
      };
    };
  
    const handlePassNextTurn = () => {
  
      if (initialDataPlayer1.length === 0){
        dispatch( startResetGame());
        return Swal.fire('Sorry', 'Computer has won', 'success');
      }
    //   setShowPlayerChips(false);
      dispatch( setTurnOffComputer());
    //   dispatch( setOffOneTurn());
    };
  
  
    return (
  
      <div   >
          <div className="seeChips">
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
