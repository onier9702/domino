
import { getTenChipsPlayers } from "../../helpers/getPlayersData";
import { resetController, setChipId, setChipSel, setCount, setFirstChip, setLeftChip, setRightChip, setTableChip } from "../gameController/controllerSlice";
import { resetUi, setBothFalse, setBothTrue, setEndGame, setOffEndGame } from "../ui/uiSlice";
import { deleteChipById, resetDataGame, setInitialDataPlayer } from "./dataSlice";

const setDataOnRedux = ( player1 = [], player2 = [] ) => {

    return (dispatch) => {

        dispatch( setInitialDataPlayer({player1, player2}) );

    };

};

const determinateSideAndFindChip = ( currentValue = [], id = '', player1 = [], player2 = [], bothCondition = '') => {

    return (dispatch) => {

        // dispatch( setBothFalse()); // put always the boolean both state in false
        let chipSel;
        let left;
        let right;

        if ( player1.length > 0 ){
            const {chip} = player1.find( chip => chip.id === id );
            chipSel = chip;
        } else {
            const {chip} = player2.find( chip => chip.id === id );
            chipSel = chip;
        };
    
        if ( currentValue.length > 0 ){
            
            if ( (currentValue[0] === chipSel[0] || currentValue[0] === chipSel[1]) && (currentValue[1] === chipSel[0] || currentValue[1] === chipSel[1]) ){

                if ( bothCondition === 'Left'){
                    right = currentValue[1];
                    for ( let i = 0; i<2; i++ ){
                        if(currentValue[0] !== chipSel[i]){ 
                            left = chipSel[i];
                        };
                    };
                    if ( !left){
                        left = chipSel[0];  // the chip is double(same number right than left)
                    };
                    dispatch( setCount([left,right]) );
                    dispatch( setChipSel(chipSel) );
                    dispatch( setChipId(id) );
                    return {
                        msg: 'Left',
                        chip: chipSel
                    };
                } else if ( bothCondition === 'Right'){

                    left = currentValue[0];
                    for ( let i = 0; i<2; i++ ){
                        if(currentValue[1] !== chipSel[i]){
                            right = chipSel[i];
                        };
                    };
                    if ( !right){
                        right = chipSel[0];  // the chip is double(same number right than left)
                    };
                    dispatch( setCount([left,right]) );
                    dispatch( setChipSel(chipSel) );
                    dispatch( setChipId(id) );
                    return {
                        msg: 'Right',
                        chip: chipSel
                    };
                };
                return {
                    msg: 'Both',
                    chip: chipSel
                };
            } else if ( (currentValue[0] === chipSel[0] || currentValue[0] === chipSel[1]) ) {
                right = currentValue[1];
                for ( let i = 0; i<2; i++ ){
                    if(currentValue[0] !== chipSel[i]){
                        left = chipSel[i];
                    };
                };
                if ( !left){
                    left = chipSel[0];  // the chip is double(same number right than left)
                };
                dispatch( setCount([left,right]) );
                return {
                    msg: 'Left',
                    chip: chipSel
                };
            } else if ( (currentValue[1] === chipSel[0] || currentValue[1] === chipSel[1]) ){
                left = currentValue[0];
                for ( let i = 0; i<2; i++ ){
                    if(currentValue[1] !== chipSel[i]){
                        right = chipSel[i];
                    };
                };
                if ( !right){
                    right = chipSel[0];  // the chip is double(same number right than left)
                };
                dispatch( setCount([left,right]) );
                return {
                    msg: 'Right',
                    chip: chipSel
                };
            } else { 
                return {
                    msg: 'Pass',
                    chip: chipSel
                }; 
            }
        };
    
        dispatch( setCount(chipSel) );
        return {
            msg: 'First Strike',
            chip: chipSel
        };

    };

};

const setFindedChip = ( chip = [], condition = '', table = [], pastValue = [] ) => {

    return (dispatch) => {

        let data = {
            rotate: false,
            rotate90: false, 
            chip
        };

        if ( chip[0] === chip[1] ){
            data.rotate90 = true;
        }

        let newArr = [];
        table.map( e => newArr.push(e) );
        if ( condition === 'Left' ){
            if ( pastValue[0] !== chip[1] ){
                data.rotate = true;
            };
            newArr.unshift( data );
        } else if ( condition === 'Right' ){
            if ( pastValue[1] !== chip[0] ){
                data.rotate = true;
            };
            newArr.push( data );
        } else if( condition === 'First Strike' ) {
            newArr.push( data );
        };

        dispatch( setTableChip(newArr) );


    };
};

const startDeleteChip = ( id = '', player = '' ) => {

    return (dispatch) => {

        dispatch( deleteChipById( {
            id,
            player
        }));

    };
};

const startResetGame = () => {

    return (dispatch) => {

        dispatch( resetDataGame() );
        dispatch( resetController() );
        dispatch( resetUi() );
        dispatch( setEndGame() );
        
    };
};

const startNewGame = () => {
    
    return (dispatch) => {

        dispatch( setOffEndGame() );
        const [ dataPlayer1, dataPlayer2 ]  = getTenChipsPlayers();
        dispatch( setDataOnRedux(dataPlayer1, dataPlayer2) );

    };
};

export {
    setDataOnRedux,
    setFindedChip,
    determinateSideAndFindChip,
    startDeleteChip,
    startResetGame,
    startNewGame,
}