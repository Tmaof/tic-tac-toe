import { SquaresList } from '../Board/Board.type';

/** 棋类组件的Props的类型 */
export type ChessProps = {
    /** 不同棋手的棋子样式，支持两个以上的多玩家 */
    playerFlags: string[];
    /** 棋盘的行数 */
    rowNum: number;
    /** 棋盘的列数 */
    colNum: number;
    /** 要求获胜时在一条线上的最少棋子数量 */
    successNeedNum: number;
}

/** 历史记录对象的类型 */
export type HistoryObj = {
    squares: SquaresList;
    nextPlayerIndex: number;
}

/** 历史记录列表的类型 */
export type HistoryList = HistoryObj[]
