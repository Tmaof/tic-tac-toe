import { GameConfig } from '../store/modules/game/reducer.type';

const playerInfoListAIMode1 = [{ name: '玩家', id: 1, flag: '❌', isAI: false }, { name: 'AI', id: 2, flag: '🔘', isAI: true }];
const playerInfoList1 = [{ name: '玩家1', id: 1, flag: '❌', isAI: false }, { name: '玩家2', id: 2, flag: '🔘', isAI: false }];
const playerInfoList2 = [{ name: '玩家1', id: 1, flag: '⚫', isAI: false }, { name: '玩家2', id: 2, flag: '⚪', isAI: false }];
const playerInfoList3 = [{ name: '玩家1', id: 1, flag: '🟢', isAI: false }, { name: '玩家2', id: 2, flag: '🟣', isAI: false }, { name: '玩家3', id: 3, flag: '🔵', isAI: false }];
const configList: GameConfig[] = [
    { id: 0, name: '井字棋（AI对抗）', ChessProps: { isAIMode: true, playerInfoList: playerInfoListAIMode1, rowNum: 3, colNum: 3, successNeedNum: 3 } },
    { id: 2, name: '井字棋', ChessProps: { isAIMode: false, playerInfoList: playerInfoList1, rowNum: 3, colNum: 3, successNeedNum: 3 } },
    { id: 3, name: '五子棋（15*15）', ChessProps: { isAIMode: false, playerInfoList: playerInfoList2, rowNum: 15, colNum: 15, successNeedNum: 5 } },
    { id: 4, name: '五子棋（15*25）', ChessProps: { isAIMode: false, playerInfoList: playerInfoList2, rowNum: 15, colNum: 25, successNeedNum: 5 } },
    { id: 5, name: '七子棋（3个玩家）', ChessProps: { isAIMode: false, playerInfoList: playerInfoList3, rowNum: 20, colNum: 20, successNeedNum: 7 } },
];

/**
 * 模拟 获取游戏配置列表
 */
export const getGameConfigListAPI = () => {
    return new Promise<GameConfig[]>((resolve) => {
        setTimeout(() => {
            resolve(configList);
        }, 500);
    });
};
