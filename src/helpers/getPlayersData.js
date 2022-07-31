
const { v4: uuidV4 } = require('uuid');

export const getTenChipsPlayers = () => {

    let dataPlayer1 = [];
    let dataPlayer2 = [];

    const arrChips = [ [0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6],
                        [1,1], [1,2], [1,3], [1,4], [1,5], [1,6],
                         [2,2], [2,3], [2,4], [2,5], [2,6],
                          [3,3], [3,4], [3,5], [3,6],
                           [4,4], [4,5], [4,6],
                            [5,5], [5,6],
                             [6,6] ];

    // const arrChips = [ [0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7], [0,8], [0,9],
    //                     [1,1], [1,2], [1,3], [1,4], [1,5], [1,6], [1,7], [1,8], [1,9],
    //                      [2,2], [2,3], [2,4], [2,5], [2,6], [2,7], [2,8], [2,9],
    //                       [3,3], [3,4], [3,5], [3,6], [3,7], [3,8], [3,9],
    //                        [4,4], [4,5], [4,6], [4,7], [4,8], [4,9],
    //                         [5,5], [5,6], [5,7], [5,8], [5,9],
    //                          [6,6], [6,7], [6,8], [6,9],
    //                           [7,7], [7,8], [7,9],
    //                            [8,8], [8,9],
    //                             [9,9] ];

    function getRandomInt(min = 0, max = 28) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    };

    let twentyNumbers = [];

    do {

        let newPosition = getRandomInt();
        let condition = false;
        for (let n of twentyNumbers){
            if ( n === newPosition ){
                condition = true;
                break;
            };
        };
        if ( !condition ){
            twentyNumbers.push(newPosition);
        }
        
    } while (twentyNumbers.length < 12);

    for ( let i = 0; i < 12; i++ ){
        if ( i < 6 ){
            dataPlayer1.push({
                id: uuidV4(), 
                chip: arrChips[ twentyNumbers[i] ]
            });
        } else {
            dataPlayer2.push({
                id: uuidV4(), 
                chip: arrChips[ twentyNumbers[i] ]
            });
        };
    };
    
    return [dataPlayer1, dataPlayer2];
};