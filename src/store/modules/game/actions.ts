import { GameActionTypesEnum, SetCurrentConfigIdAction,  SetGameConfigListAction } from './actions.type';
import { GameConfig } from './reducer.type';

/**
 * 设置当前配置的id，返回一个action对象
 * @param currentId 当前配置的id
 * @returns
 */
export const setCurrentConfigId = (currentId: number): SetCurrentConfigIdAction => {
    return {
        type: GameActionTypesEnum.SET_CURRENT_CONFIG_ID,
        payload: currentId,
    };
};

/**
 * 设置游戏配置列表，返回一个action对象
 * @param gameConfigList 游戏配置列表
 * @returns
 */
export const setGameConfigList = (gameConfigList: GameConfig[]): SetGameConfigListAction => {
    return {
        type: GameActionTypesEnum.SET_GAME_CONFIG_LIST,
        payload: gameConfigList,
    };
};
