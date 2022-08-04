
export const whoWinTiedGame = (dataPlayer1 = [], dataPlayer2 = []) => {

    let count1 = 0;
    let count2 = 0;

    dataPlayer1.map( e => {

        for ( let i = 0; i < 2; i++ ){
            count1 += e.chip[i];
        };

    } );

    dataPlayer2.map( e => {

        for ( let i = 0; i < 2; i++ ){
            count2 += e.chip[i];
        };

    } );

    if ( count1 > count2 ){
        return {
            winner: 'Player',
            count1,
            count2
        }
    } else if ( count1 < count2 ){
        return {
            winner: 'Computer',
            count1,
            count2
        }
    } else {
        return {
            winner: 'tied',
            count1
        }
    };


};