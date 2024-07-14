import { PosInfo } from '../../utils/index.type';

/** 棋盘二维列表，其中：字符串表示棋子，或null表示空 */
export type SquaresList = ((string | null)[])[]

/** 定义Board组件的属性类型 */
export type BoardProps = {
    /** 每个格子的宽度，默认为50px */
    latticeWidth?: string;
    /** 所有格子的一个二维列表，每个元素可以是字符串或null */
    squares: SquaresList;
    /**
     * 完成一次下棋后触发的回调函数
     * @param posY 点击的棋子纵坐标(行位置)
     * @param posX 点击的棋子横坐标(列位置)
     * @returns
     */
    onPlay: (posY: number, posX: number,) => void;
    /** 当游戏结束时，在同一条线上的点的坐标的一个列表 */
    onLinePointPosList: PosInfo[];
}
