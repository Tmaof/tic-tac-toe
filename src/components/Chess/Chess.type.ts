import { SquaresList } from '../Board/Board.type';
import { PosInfo } from '../../utils/index.type';

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
}

/** 历史记录对象的类型 */
export type HistoryObj = {
    /** 棋盘的棋子列表 */
    squares: SquaresList;
    /** 下一个棋手的索引 */
    nextPlayerIndex: number;
    /** 当游戏结束时，在同一条线上的点的坐标的一个列表 */
    onLinePointPosList: PosInfo[];
    /** 该状态记录下游戏是否结束 */
    gameOver: boolean;
}

/** 历史记录列表的类型 */
export type HistoryList = HistoryObj[]
