import { calculateWinner } from '.';
import { SquaresList } from '../components/Board/Board.type';
import { PosInfo } from './index.type';

/**
 * 评估当前棋盘状态的得分
 * @param squares 棋盘二维列表
 * @param flag 希望尽可能获胜的棋子标记
 * @param successNeedNum 要求获胜时在一条线上的最少棋子数量
 * @param pos 当前棋子的位置
 * @returns 如果当前棋子胜利返回10分，对方胜利返回-10分，平局返回0分
 */
const evaluate = (squares: SquaresList, flag: string, successNeedNum: number, pos: PosInfo): number => {
    const winner = calculateWinner(squares, successNeedNum, pos);
    if (!winner.winner) return 0;
    if (winner.winner === flag) {
        return 10;
    }
    return -10;
};

/**
 * 极大极小算法递归函数
 * @param squares 棋盘二维数组
 * @param flag 当前棋子的标记
 * @param opponentFlag 对手的标记
 * @param successNeedNum 要求获胜时在一条线上的最少棋子数量
 * @param pos 当前棋子的位置
 * @returns 当前棋盘状态的最佳得分
 */
const minimax = (squares: SquaresList, isMaximizing: boolean, flag: string, opponentFlag: string, successNeedNum: number, pos: PosInfo): number => {
    // 评估上次放置棋子的位置的分数
    const score = evaluate(squares, flag, successNeedNum, pos);
    if (score === 10 || score === -10) return score;

    // 棋盘已经满了，不需要再遍历棋盘空位下棋了，否则继续遍历棋盘空位进行下棋，直到：有玩家获胜或者棋盘满了
    if (squares.flat().every(cell => cell)) return 0;

    const rowMax = squares.length; // 棋盘的行数
    const colMax = squares[0].length; // 棋盘的列数

    if (isMaximizing) {
        let best = -Infinity;
        // 遍历棋盘上的每一个空位
        for (let row = 0; row < rowMax; row++) {
            for (let col = 0; col < colMax; col++) {
                if (!squares[row][col]) {
                    squares[row][col] = flag; // 尝试在该空位上放置当前玩家的棋子
                    // 递归调用minimax，切换玩家角色（因为到对手玩家下棋了）
                    best = Math.max(best, minimax(squares, false, flag, opponentFlag, successNeedNum, { posY: row, posX: col }));
                    squares[row][col] = null; // 回退，把该位置上的棋子恢复为空
                }
            }
        }
        return best;
    }
    let best = Infinity;
    for (let row = 0; row < rowMax; row++) {
        for (let col = 0; col < colMax; col++) {
            if (!squares[row][col]) {
                squares[row][col] = opponentFlag; // 尝试在该空位上放置对手玩家的棋子
                best = Math.min(best, minimax(squares, true, flag, opponentFlag, successNeedNum, { posY: row, posX: col }));
                squares[row][col] = null;
            }
        }
    }
    return best;
};

/**
 * 计算最佳下棋位置
 * @param squares 棋盘二维列表
 * @param flag 希望尽可能获胜的棋子标记（当前需要下棋的棋子标记）
 * @param opponentFlag 对方棋子标记
 * @param successNeedNum 获胜所需的棋子数量
 * @returns 最佳的该棋子下棋的位置
 */
export const calculateNextMove = (squares: SquaresList, flag: string, opponentFlag: string, successNeedNum: number): PosInfo => {
    squares = JSON.parse(JSON.stringify(squares));
    let bestVal = -Infinity;
    let bestMove: PosInfo = { posY: -1, posX: -1 };
    const rowMax = squares.length; // 棋盘的行数
    const colMax = squares[0].length; // 棋盘的列数
    // 遍历棋盘上的每一个空位
    for (let row = 0; row < rowMax; row++) {
        for (let col = 0; col < colMax; col++) {
            if (!squares[row][col]) {
                squares[row][col] = flag; // 尝试在该空位上放置当前玩家的棋子
                const moveVal = minimax(squares, false, flag, opponentFlag, successNeedNum, { posY: row, posX: col });// 注意这里isMaximizing为false，因为下一个下棋的是对手
                squares[row][col] = null; // 回退，把该位置上的棋子恢复为空
                // 如果当前位置的分数大于最佳分数，则更新最佳分数和最佳走法位置
                // 因为是当前玩家（flag）希望尽可能获胜，而在评估函数中，当前玩家获胜是+10分，所以分数越大越好
                if (moveVal > bestVal) {
                    bestMove = { posY: row, posX: col };
                    bestVal = moveVal;
                }
            }
        }
    }

    return bestMove;
};
