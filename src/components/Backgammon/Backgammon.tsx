import Chess from '../Chess/Chess';

/** 五子棋游戏组件 */
const Backgammon: React.FC = () => {
    /** 渲染组件 */
    return (<Chess playerFlagList={['⚫', '⚪']} mode='backgammon'></Chess>);
};

/** 导出五子棋组件供其他部分使用 */
export default Backgammon;
