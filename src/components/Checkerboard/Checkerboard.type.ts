import { PosInfo } from '../../utils/index.type';

export type CheckerboardProps = {
    /** 格子的宽高 */
    size?: React.CSSProperties['width'];
    /** 是否高亮当前格子 */
    isActive: boolean;
    /** 棋子的字符 */
    flag: string | null;
    /** 格子的纵坐标 */
    posY: number;
    /** 格子的横坐标 */
    posX: number;
    /** 当点击格子时触发 */
    onClickCheckerboard: (pos: PosInfo) => void;
}
