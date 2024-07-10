/** 棋盘二维列表，其中：字符串表示棋子，或null表示空 */
export type SquaresList = ((string | null)[])[]

/** 定义Board组件的属性类型 */
export type BoardProps = {
    /** 每个格子的宽度，默认为50px */
    latticeWidth?: string;
    /** 所有格子的一个二维列表，每个元素可以是字符串或null */
    squares: SquaresList;
    /** 下一个棋子的样式 */
    nextFlag: string;
    /** 完成一次下棋后触发的回调函数，参数为更新后的棋盘格子列表 */
    onPlay: (squares: SquaresList) => void;
}
