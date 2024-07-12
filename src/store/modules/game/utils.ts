import { store } from '../..';
import { setCurrentConfigId, setGameConfigList } from './actions';
import { GameConfig, GameConfigId } from './reducer.type';

/**
 * 设置当前使用的游戏配置id(即当前的棋类游戏)
 * @param configId 配置id
 */
export const setCurrentConfigIdUtil = (configId:GameConfigId) => {
    store.dispatch(setCurrentConfigId(configId));
};

/**
 * 设置游戏的配置列表
 * @param gameConfigList 配置列表
 */
export const setGameConfigListUtil = (gameConfigList: GameConfig[]) => {
    store.dispatch(setGameConfigList(gameConfigList));
};
