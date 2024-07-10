import { ChessProps } from '../Chess/Chess.type';
import { GameConfig } from './Game.type';

/**
 * 创建游戏配置对象
 *
 * @param name 游戏名称
 * @param playerFlags 不同棋手的棋子样式，支持两个以上的多玩家
 * @param rowNum 棋盘的行数
 * @param colNum 棋盘的列数
 * @param successNeedNum 要求获胜时在一条线上的最少棋子数量
 * @returns 返回游戏配置对象
 */
const createGameConfig = function createGameConfig (name: GameConfig['name'], playerFlags:ChessProps['playerFlags'], rowNum:ChessProps['rowNum'], colNum:ChessProps['colNum'], successNeedNum:ChessProps['successNeedNum']): GameConfig {
    return {
        name,
        ChessProps: {
            playerFlags,
            rowNum,
            colNum,
            successNeedNum,
        },
    };
};

/**
 * 获取游戏配置列表
 */
export const getGameConfigList = function getGameConfigList (): GameConfig[] {
    return [
        createGameConfig('井字棋', ['❌', '🔘'], 3, 3,  3),
        createGameConfig('五子棋（15*15）', ['⚫', '⚪'], 15, 15,  5),
        createGameConfig('五子棋（15*25）', ['⚫', '⚪'], 15, 25,  5),
        createGameConfig('七子棋（3个玩家）', ['🟢', '🟣', '🔵'], 20, 20,  7),
    ];
};
