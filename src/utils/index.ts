import { SquaresList } from '../components/Board/Board';

/**
 * 计算五子棋的胜利者
 * @param squares 五子棋棋盘列表5*5大小
 * @returns 胜利者或者null
 */
const calculateWinnerOfBackgammon = function calculateWinner (squares: SquaresList) {
    const lines = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 13, 12, 16, 20],
    ];
    for (let index = 0; index < lines.length; index++) {
        const [one, two, three, four, five] = lines[index];
        if (squares[one] && squares[one] === squares[two] && squares[one] === squares[three] && squares[one] === squares[four] && squares[one] === squares[five]) {
            return squares[one];
        }
    }
    return null;
};

/**
 * 计算井字棋的胜利者
 * @param squares 井字棋棋盘列表3*3大小
 * @returns 胜利者或者null
 */
const calculateWinnerOfTicTacToe = function calculateWinner (squares: SquaresList) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let index = 0; index < lines.length; index++) {
        const [one, two, three] = lines[index];
        if (squares[one] && squares[one] === squares[two] && squares[one] === squares[three]) {
            return squares[one];
        }
    }
    return null;
};

export { calculateWinnerOfBackgammon, calculateWinnerOfTicTacToe };
