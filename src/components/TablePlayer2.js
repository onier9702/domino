
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { determinateSideAndFindChip, setFindedChip, startDeleteChip } from '../slices/dataPlayers/thunks';
import { setChipId } from '../slices/gameController/controllerSlice';

import '../styles/tablePlayer2.css';

export const TablePlayer2 = () => {

    const { initialDataPlayer2 } = useSelector( state => state.data);
    const dispatch = useDispatch();
    const { value, table, pastValue, chipSel, id } = useSelector( state => state.count);
    const [showButton, setShowButton] = useState(false);
    const [condit, setCondit] = useState('');

    useEffect(() => {

        dispatch( startDeleteChip( id, 'player2' ));
        // console.log(id);
        let chipOtherWay;
        if ( id ){
            const {chip} = dispatch( determinateSideAndFindChip(value, id, undefined, initialDataPlayer2, condit) );
            chipOtherWay = chip;
        };
    
        dispatch( setFindedChip( chipOtherWay, condit, table, value ) );
        // console.log(chipOtherWay);

        setShowButton(false);
        
      }, [setCondit, condit])

    const handleClickChip = (e) => { 
        // console.log(e.target.id);
        const id = e.target.id;
        dispatch( setChipId(id));

        // dispatch( determinateSideAndFindChip(value, e.target.id, undefined, initialDataPlayer2) )
        //     .then( resp => {
        //         console.log(resp.msg);
        //     } )
        //     .catch( err => console.log(err));
        const {msg, chip} = dispatch( determinateSideAndFindChip(value, id, undefined, initialDataPlayer2, undefined) )
        console.log(msg);    

        // console.log(condition);
        switch (msg) {

            case 'Both':
                setShowButton(true);
                // dispatch( setFindedChip( chip, 'Right', table, value ) );
                // dispatch( startDeleteChip( id, 'player2' ));
                break;
                
            case 'Left':
                dispatch( setFindedChip( chip, 'Left', table, value ) );
                dispatch( startDeleteChip( id, 'player2' ));
                break;

            case 'Right':
                dispatch( setFindedChip( chip, 'Right', table, value ) );
                dispatch( startDeleteChip( id, 'player2' ));
                break;

            case 'First Strike':
                dispatch( setFindedChip( chip, 'First Strike', table, value ) );
                dispatch( startDeleteChip( id, 'player2' ));
                break;

            case 'Pass':
                break;

        }
    }

  return (

    <div /*className="portionTable"*/  >
        <h3>Player</h3>
        <div className="list-chips">
            <div className="slider">
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
