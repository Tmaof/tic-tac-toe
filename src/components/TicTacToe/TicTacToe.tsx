import Chess from '../Chess/Chess';

/** 井字棋游戏组件 */
const TicTacToe: React.FC = () => {
    /** 渲染组件 */
    return (<Chess playerFlagList={['❌', '🔘']} mode='calculate'></Chess>);
};

/** 导出井字棋组件供其他部分使用 */
export default TicTacToe;
