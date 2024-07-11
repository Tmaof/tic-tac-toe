import { GameConfig } from './reducer.type';

/** game模块 action.type 的枚举 */
export enum GameActionTypesEnum {
    /** 设置当前游戏配置的id */
    SET_CURRENT_CONFIG_ID = 'game/SET_CURRENT_CONFIG_ID',
    /** 设置游戏配置列表 */
    SET_GAME_CONFIG_LIST = 'game/SET_GAME_CONFIG_LIST',
}

/** 设置当前游戏配置的id的action */
export type SetCurrentConfigIdAction = {
    type: GameActionTypesEnum.SET_CURRENT_CONFIG_ID;
    payload: number;
};

/** 设置游戏配置列表的action */
export type SetGameConfigListAction = {
    type: GameActionTypesEnum.SET_GAME_CONFIG_LIST;
    payload: GameConfig[];
};

/** game模块 action的类型 */
export type GameAction = SetCurrentConfigIdAction | SetGameConfigListAction;
