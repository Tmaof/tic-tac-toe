import { SquaresList } from '../components/Board/Board.type';

/**
 * 计算胜利者。
 * 检查在posY和posX位置的棋子周围的所有可能方向上是否有连续的successNeedNum个相同的棋子在同一直线上。
 * 这里我们主要关注四个方向：水平、垂直、正对角线和反对角线。
 *
 * @param squares 棋盘二维数组
 * @param successNeedNum 要求获胜时在一条线上的最少棋子数量
 * @param posX 棋子横坐标(列位置)
 * @param posY 棋子纵坐标(行位置)
 * @returns 获胜者的标记（字符串），如果没有获胜者则返回null
 */
export const calculateWinner = function calculateWinner (squares: SquaresList, successNeedNum: number, posX: number, posY: number): string | null {
    /**
     * 这个函数会检查在给定的方向上是否有连续的successNeedNum个相同棋子。
     * @param dx 在x轴上的移动步长
     * @param dy 在y轴上的移动步长
     * @returns
     */
    const checkDirection = function checkDirection (dx: number, dy: number) {
        let currentCount = 1; // 当前连续的棋子数量

        // 向前检查
        /** 移动后的横坐标 */
        let newX = posX + dx;
        /** 移动后的纵坐标 */
        let newY = posY + dy;
        while (newX >= 0 && newX < squares[0].length && newY >= 0 && newY < squares.length) { // 确保在棋盘内
            // 棋子相同
            if (squares[newY][newX] === squares[posY][posX]) {
                newX += dx;
                newY += dy;
                currentCount++;
            } else {
                // 棋子不连续了，直接结束
                break;
            }
        }

        // 向后检查
        newX = posX - dx;
        newY = posY - dy;
        while (newX >= 0 && newX < squares[0].length && newY >= 0 && newY < squares.length) {
            if (squares[newY][newX] === squares[posY][posX]) {
                newX -= dx;
                newY -= dy;
                currentCount++;
            } else {
                break;
            }
        }

        return currentCount >= successNeedNum;
    };

    // 检查所有方向：调用checkDirection四次，分别检查水平、垂直、正对角线和反对角线方向。
    if (checkDirection(1, 0) || checkDirection(0, 1) || checkDirection(1, 1) || checkDirection(-1, 1)) {
        return squares[posY][posX]; // 返回获胜者
    }

    return null; // 如果没有获胜者
};
