import { ChessProps } from '../../../components/Chess/Chess.type';


/** 游戏模式配置对象的类型 */
export type GameConfig = {
    /** 游戏模式ID */
    id: number;
    /** 游戏模式名称 */
    name: string;
    /** 棋盘的Props */
    ChessProps: Omit<ChessProps, 'configId'>;
}

/** 游戏模式ID类型 */
export type GameConfigId = number;

/** 游戏状态对象类型 */
export type GameState = {
    /** 当前配置的id */
    currentConfigId: GameConfigId;
    /** 游戏配置列表 */
    gameConfigList: GameConfig[];
}
