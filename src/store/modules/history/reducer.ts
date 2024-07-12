import { GameConfigId } from '../game/reducer.type';
import { HistoryAction, HistoryActionTypesEnum } from './action.type';
import { HistoryInfo, HistoryState } from './reducer.type';

export const initState: HistoryState = new Map<GameConfigId, HistoryInfo>();

export const historyReducer = (state: HistoryState = initState, action: HistoryAction):HistoryState => {
    switch (action.type) {
        case HistoryActionTypesEnum.SET_HISTORY_LIST:
            if (state.get(action.configId) !== undefined) {
                state.set(action.configId, { ...state.get(action.configId)!, historyList: action.payload });
            } else {
                state.set(action.configId, { historyList: action.payload, currentHistoryIndex: 0 });
            }
            return new Map(state);
        case HistoryActionTypesEnum.SET_CURRENT_HISTORY_INDEX:
            if (state.get(action.configId) !== undefined) {
                state.set(action.configId, { ...state.get(action.configId)!, currentHistoryIndex: action.payload });
            }
            return new Map(state);
        case HistoryActionTypesEnum.RESET_HISTORY:
            state.delete(action.configId);
            return new Map(state);
        default:
            return state;
    }
};
