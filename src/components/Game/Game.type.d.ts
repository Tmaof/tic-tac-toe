import { ChessProps } from '../Chess/Chess.type';
/** 游戏模式配置对象的类型 */
export type GameConfig = {
    /** 游戏模式ID */
    id: number;
    /** 游戏模式名称 */
    name: string;
    /** 棋盘的Props */
    ChessProps: ChessProps;
}
