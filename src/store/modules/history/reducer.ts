import { GameConfigId } from '../game/reducer.type';
import { HistoryAction, HistoryActionTypesEnum } from './action.type';
import { HistoryInfo, HistoryState } from './reducer.type';

export const initState: HistoryState = new Map<GameConfigId, HistoryInfo>();

export const historyReducer = (state: HistoryState = initState, action: HistoryAction): HistoryState => {
    const newMap = new Map(state);
    const historyInfo = newMap.get(action.configId);
    switch (action.type) {
        case HistoryActionTypesEnum.SET_HISTORY_LIST:
            if (historyInfo) {
                newMap.set(action.configId, { ...historyInfo, historyList: action.payload });
            } else {
                newMap.set(action.configId, { historyList: action.payload, currentHistoryIndex: 0 });
            }
            return newMap;
        case HistoryActionTypesEnum.SET_CURRENT_HISTORY_INDEX:
            if (historyInfo) {
                newMap.set(action.configId, { ...historyInfo, currentHistoryIndex: action.payload });
            }
            return newMap;
        case HistoryActionTypesEnum.RESET_HISTORY:
            newMap.delete(action.configId);
            return newMap;
        default:
            return state;
    }
};
