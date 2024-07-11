import { HistoryList } from '../../store/modules/history/reducer.type';

/**
 * 初始棋盘历史数据列表，其中每一个历史对象包含棋盘二维数组和下一位棋手的棋子
 * @param rowNum 棋盘行数
 * @param colNum 棋盘列数
 * @returns 历史数据列表
 */
export const getInitHistoryList =   (rowNum:number, colNum:number): HistoryList => {
    const squares = [];
    for (let index = 0; index < rowNum; index++) {
        squares.push(Array(colNum).fill(null));
    }
    return [{
        squares,
        nextPlayerIndex: 0,
        gameOver: false,
        onLinePointPosList: [],
    }];
};
