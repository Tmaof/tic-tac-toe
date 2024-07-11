import { HistoryList } from './reducer.type';

/** history模块 历史记录的action类型枚举 */
export enum HistoryActionTypesEnum {
    /** 设置历史记录列表 */
    SET_HISTORY_LIST = 'history/SET_HISTORY_LIST',
    /** 设置当前历史记录的索引 */
    SET_CURRENT_HISTORY_INDEX = 'history/SET_CURRENT_HISTORY_INDEX',
    /** 重置历史记录 */
    RESET_HISTORY = 'history/RESET_HISTORY',
}

/** 设置历史记录列表的action类型 */
export type SetHistoryListAction = {
    type: HistoryActionTypesEnum.SET_HISTORY_LIST;
    payload: HistoryList;
};

/** 设置当前历史记录的索引的action类型 */
export type SetCurrentHistoryIndexAction = {
    type: HistoryActionTypesEnum.SET_CURRENT_HISTORY_INDEX;
    payload: number;
};

/** 重置历史记录的action类型 */
export type ResetHistoryAction = {
    type: HistoryActionTypesEnum.RESET_HISTORY;
};

/** 历史记录的action类型 */
export type HistoryAction = SetHistoryListAction | SetCurrentHistoryIndexAction | ResetHistoryAction;
