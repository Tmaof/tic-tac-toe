import { SquaresList } from '../../../components/Board/Board.type';
import { PosInfo } from '../../../utils/index.type';
import { GameConfigId } from '../game/reducer.type';

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

export type HistoryInfo = {
    /** 历史记录列表 */
    historyList: HistoryList;
    /** 当前历史记录的索引 */
    currentHistoryIndex: number;
}

/** 历史模块 状态对象类型 */
export type HistoryState = Map<GameConfigId, HistoryInfo>
