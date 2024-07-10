import { GameConfig } from './Game.type';


/**
 * 获取游戏配置列表
 */
export const getGameConfigList = (): GameConfig[] => {
    const playerInfoList1 = [{ name: '玩家1', id: 1, flag: '❌' }, { name: '玩家2', id: 2, flag: '🔘' }];
    const playerInfoList2 = [{ name: '玩家1', id: 1, flag: '⚫' }, { name: '玩家2', id: 2, flag: '⚪' }];
    const playerInfoList3 =  [{ name: '玩家1', id: 1, flag: '🟢' }, { name: '玩家2', id: 2, flag: '🟣' }, { name: '玩家3', id: 3, flag: '🔵' }];
    return [
        { id: 1, name: '井字棋', ChessProps: { playerInfoList: playerInfoList1, rowNum: 3, colNum: 3, successNeedNum: 3 } },
        { id: 2, name: '五子棋（15*15）', ChessProps: { playerInfoList: playerInfoList2, rowNum: 15, colNum: 15, successNeedNum: 5 } },
        { id: 3, name: '五子棋（15*25）', ChessProps: { playerInfoList: playerInfoList2, rowNum: 15, colNum: 25, successNeedNum: 5 } },
        { id: 4, name: '七子棋（3个玩家）', ChessProps: { playerInfoList: playerInfoList3, rowNum: 20, colNum: 20, successNeedNum: 7 } },
    ];
};
