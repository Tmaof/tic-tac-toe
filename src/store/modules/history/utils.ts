import { HistoryInfo, HistoryList } from './reducer.type';
import { store } from '../..';
import { resetHistory, setCurrentHistoryIndex, setHistoryList } from './action';
import { GameConfigId } from '../game/reducer.type';

/**
 * 初始棋盘历史数据列表，其中每一个历史对象包含棋盘二维数组和下一位棋手的棋子
 * @param rowNum 棋盘行数
 * @param colNum 棋盘列数
 * @returns 历史数据列表
 */
export const getInitHistoryList = (rowNum:number, colNum:number): HistoryList => {
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

/**
 * 获取一个棋盘的初始历史信息
 * @param rowNum 棋盘的列数
 * @param colNum 棋盘列数
 * @returns
 */
export const getInitHistoryInfo = (rowNum:number, colNum:number): HistoryInfo => {
    return {
        historyList: getInitHistoryList(rowNum, colNum),
        currentHistoryIndex: 0,
    };
};

/**
 * 设置历史记录列表
 * @param historyList 历史记录列表
 */
export const setHistoryListUtil = (configId: GameConfigId, historyList: HistoryList) => {
    store.dispatch(setHistoryList(configId, historyList));
};

/**
 * 设置当前历史记录的索引
 * @param currentIndex 当前历史记录的索引
 */
export const setCurrentHistoryIndexUtil = (configId: GameConfigId, currentIndex: number) => {
    store.dispatch(setCurrentHistoryIndex(configId, currentIndex));
};

/**
 * 重置历史记录
 */
export const resetHistoryUtil = (configId: GameConfigId) => {
    store.dispatch(resetHistory(configId));
};
