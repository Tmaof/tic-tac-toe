import { GameConfigId } from '../game/reducer.type';
import { SetHistoryListAction, HistoryActionTypesEnum, SetCurrentHistoryIndexAction, ResetHistoryAction } from './action.type';
import { HistoryList } from './reducer.type';

/**
 * 设置历史记录列表，返回一个action对象
 * @param configId 游戏配置的id
 * @param historyList 历史记录列表
 * @returns
 */
export const setHistoryList = (configId: GameConfigId, historyList: HistoryList): SetHistoryListAction => {
    return {
        type: HistoryActionTypesEnum.SET_HISTORY_LIST,
        payload: historyList,
        configId,
    };
};

/**
 * 设置当前历史记录的索引，返回一个action对象
 * @param configId 游戏配置的id
 * @param currentIndex 当前历史记录的索引
 * @returns
 */
export const setCurrentHistoryIndex = (configId: GameConfigId, currentIndex: number): SetCurrentHistoryIndexAction => {
    return {
        type: HistoryActionTypesEnum.SET_CURRENT_HISTORY_INDEX,
        payload: currentIndex,
        configId,
    };
};

/**
 * 重置历史记录，返回一个action对象
 * @param configId 游戏配置的id
 * @returns
 */
export const resetHistory = (configId: GameConfigId,): ResetHistoryAction => {
    return { type: HistoryActionTypesEnum.RESET_HISTORY, configId };
};
