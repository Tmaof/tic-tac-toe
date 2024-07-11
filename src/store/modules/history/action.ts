import { SetHistoryListAction, HistoryActionTypesEnum, SetCurrentHistoryIndexAction, ResetHistoryAction } from './action.type';
import { HistoryList } from './reducer.type';

/**
 * 设置历史记录列表，返回一个action对象
 * @param historyList 历史记录列表
 * @returns
 */
export const setHistoryList = (historyList: HistoryList): SetHistoryListAction => {
    return {
        type: HistoryActionTypesEnum.SET_HISTORY_LIST,
        payload: historyList,
    };
};

/**
 * 设置当前历史记录的索引，返回一个action对象
 * @param currentIndex 当前历史记录的索引
 * @returns
 */
export const setCurrentHistoryIndex = (currentIndex: number): SetCurrentHistoryIndexAction => {
    return {
        type: HistoryActionTypesEnum.SET_CURRENT_HISTORY_INDEX,
        payload: currentIndex,
    };
};

/**
 * 重置历史记录，返回一个action对象
 * @returns
 */
export const resetHistory = (): ResetHistoryAction => {
    return { type: HistoryActionTypesEnum.RESET_HISTORY };
};
