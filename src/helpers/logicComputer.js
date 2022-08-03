

export const logicComputer = ( dataComputer = [] ,value = [], ) => {

    let listAvailableChips = [];
    dataComputer.forEach( elem => {

        for ( let i = 0; i < 2; i++ ){

            for ( let j = 0; j < 2; j++ ){

                if ( elem.chip[i] === value[j] ){  // there is at least one chip to play
                    listAvailableChips.push( elem );
                }
            }

        }

    } );

    let realArrAvailableChips = [];
    let c = 0;
    if ( listAvailableChips[0] ){
        realArrAvailableChips.push( listAvailableChips[0] );
        for ( let chip of listAvailableChips ){
            if ( c !== 0 ){
                if ( chip.chip !== listAvailableChips[c-1].chip ){
                    realArrAvailableChips.push(chip);
                }
            };
            c++;
        };
    };
    if ( realArrAvailableChips[0] ){
        
        console.log(realArrAvailableChips);
        // verify if it is a 'both' side case
        console.log(realArrAvailableChips[0].chip[0]);
        console.log(realArrAvailableChips[0].chip[1]);
       

        if (( value[0] === realArrAvailableChips[0].chip[0] || value[0] === realArrAvailableChips[0].chip[1]) && (value[1] === realArrAvailableChips[0].chip[0] || value[1] === realArrAvailableChips[0].chip[1]) ){
            return {
                ok: true,
                chipId: realArrAvailableChips[0].id,
                cond: 'Both'
            }
        };

        return {
            ok: true,
            chipId: realArrAvailableChips[0].id,
        };

        // realArrAvailableChips.forEach( elem => {

        //     if ( elem.chip[0] === elem.chip[1] ){  // it is a double
        //         if ( value[0] === elem.chip[0] ){
        //             return {
        //                 ok: true,
        //                 chipId: elem.id,
        //                 cond: 'Left'
        //             }
        //         } else {
        //             return {
        //                 ok: true,
        //                 chipId: elem.id,
        //                 cond: 'Right'
        //             }
        //         }
        //     }

        // } );

        // if ( value[0] === realArrAvailableChips[0].chip[0] || value[0] === realArrAvailableChips[0].chip[1]  ){
        //     return {
        //         ok: true,
        //         chipId: realArrAvailableChips[0].id,
        //         cond: 'Left'
        //     };
        // };

        // if ( value[1] === realArrAvailableChips[0].chip[0] || value[1] === realArrAvailableChips[0].chip[1] ) {
        //     return {
        //         ok: true,
        //         chipId: realArrAvailableChips[0].id,
        //         cond: 'Right'
        //     };
        // };

    } else {
        return {
            ok: false,
        }
    }
    
    // exactly this function shlould return the id of choosen chip

};