import { GameAction, GameActionTypesEnum } from './actions.type';
import { GameState } from './reducer.type';

const initState: GameState = {
    currentConfigId: 0,
    gameConfigList: [],
};

export const gameReducer = (state: GameState = initState, action: GameAction) => {
    switch (action.type) {
        case GameActionTypesEnum.SET_CURRENT_CONFIG_ID:
            return { ...state, currentConfigId: action.payload };
        case GameActionTypesEnum.SET_GAME_CONFIG_LIST:
            return { ...state, gameConfigList: action.payload };
        default:
            return state;
    }
};
