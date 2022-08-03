
export const hasPlayerAnyValidChip = ( value = [], dataPlayer = [] ) => {

    
    let playerHasValidChip = true;
    if ( value.length > 0 ){

        dataPlayer.forEach( e => {

            for ( let i = 0; i<2; i++ ){
                for ( let j = 0; j<2; j++){

                    if ( e.chip[i] === value[j] ){
                        playerHasValidChip = false;
                        break;
                    };
                }
            }
        } );
    };
    
    if ( playerHasValidChip ){
        return false;
    } else {
        return true;
    };
    

};