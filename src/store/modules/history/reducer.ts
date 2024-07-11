import { HistoryAction, HistoryActionTypesEnum } from './action.type';
import { HistoryState } from './reducer.type';

export const initState: HistoryState = {
    historyList: [{
        squares: [],
        nextPlayerIndex: 0,
        gameOver: false,
        onLinePointPosList: [],
    }],
    currentHistoryIndex: 0,
};

export const historyReducer = (state: HistoryState = initState, action: HistoryAction) => {
    switch (action.type) {
        case HistoryActionTypesEnum.SET_HISTORY_LIST:
            return {
                ...state,
                historyList: action.payload,
            };
        case HistoryActionTypesEnum.SET_CURRENT_HISTORY_INDEX:
            return {
                ...state,
                currentHistoryIndex: action.payload,
            };
        case HistoryActionTypesEnum.RESET_HISTORY:
            return { ...initState };
        default:
            return state;
    }
};
