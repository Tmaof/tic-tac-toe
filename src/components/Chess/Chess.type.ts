import { GameConfigId } from '../../store/modules/game/reducer.type';

/** 玩家信息 */
export type PlayerInfo = {
    /** 棋子的样式 */
    flag: string;
    /** 玩家的名字 */
    name: string;
    /** 玩家的id */
    id: number;
}


/** 棋类组件的Props的类型 */
export type ChessProps = {
    /** 不同棋手信息的列表，支持两个以上的多玩家 */
    playerInfoList: PlayerInfo[];
    /** 棋盘的行数 */
    rowNum: number;
    /** 棋盘的列数 */
    colNum: number;
    /** 要求获胜时在一条线上的最少棋子数量 */
    successNeedNum: number;
    /** 当前棋盘的id */
    configId: GameConfigId;
}
