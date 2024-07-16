import { PlayerInfo } from './Chess.type';

/**
 * 查找AI玩家或者人类玩家在玩家列表中的索引
 * @param playerList 玩家列表
 * @param isAI 是否是查找AI玩家
 * @returns
 */
export const getPlayerIndex = (playerList: PlayerInfo[], isAI: boolean) => {
    return playerList.findIndex(player => player.isAI === isAI);
};

/**
 * 根据棋手的棋子查找棋手的信息
 * @param playerList 棋手信息的列表
 * @param flag 棋子
 * @returns
 */
export const getWinnerInfo = (playerList: PlayerInfo[], flag: string | null) => {
    if (!flag) return null;
    return playerList.find(player => player.flag === flag) || null;
};
