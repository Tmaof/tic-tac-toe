import { ChessProps } from '../../../components/Chess/Chess.type';

/** 游戏模式配置对象的类型 */
export type GameConfig = {
    /** 游戏模式ID */
    id: number;
    /** 游戏模式名称 */
    name: string;
    /** 棋盘的Props */
    ChessProps: ChessProps;
}

/** 游戏状态对象类型 */
export type GameState = {
    /** 当前配置的id */
    currentConfigId: number;
    /** 游戏配置列表 */
    gameConfigList: GameConfig[];
}