import { useEffect, useMemo, useState } from 'react';
import Board, { SquaresList } from '../Board/Board'; // 导入棋盘格子列表的类型定义

/** 计算井字棋的胜利者 */
const calculateWinner = function calculateWinner (squares: SquaresList) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let index = 0; index < lines.length; index++) {
        const [one, two, three] = lines[index];
        if (squares[one] && squares[one] === squares[two] && squares[one] === squares[three]) {
            return squares[one];
        }
    }
    return null;
};

/** 获取初始棋盘数据 */
const getInitSquares = function getInitSquares (): SquaresList {
    return Array(9).fill(null);
};

/** 井字棋游戏组件 */
const TicTacToe: React.FC = () => {
    /** 棋盘状态历史记录的列表 */
    const [history, setHistory] = useState([getInitSquares()]);
    /** 当前棋盘记录的位置 */
    const [currentMove, setCurrentMove] = useState(0);
    /** 计算当前的棋盘状态 */
    const currentSquares = useMemo(() => {
        return history[currentMove];
    }, [currentMove, history]);
    /** 时间旅行的每一项元素 */
    const timeTravelItemList = useMemo(() => {
        return history.map((_squares, index) => {
            let description;
            if (index > 0) {
                description = `回到状态 #${index}`;
            } else {
                description = '回到游戏开始';
            }
            return (
                <li key={index}>
                    <button onClick={() => setCurrentMove(index)}>{description}</button>
                </li>
            );
        });
    }, [history]);

    /** 棋手状态，包含棋手列表和当前棋手的索引 */
    const [playerFlag, setPlayerFlag] = useState({
        list: ['X', 'O'],
        next: 0,
    });

    /** 监听棋盘的改变 */
    useEffect(() => {
        // 下完一棋后需要判断是否存在胜利者
        const winner = calculateWinner(currentSquares);
        if (winner) {
            window.confirm(`棋手${winner}胜利了！`);
        }
    }, [currentSquares]);

    /**
   * 处理下棋的函数
   * @param {SquaresList} nextSquares - 更新后的棋盘状态
   */
    const handlePlay = function handlePlay (nextSquares: SquaresList) {
        // 将新的状态添加到历史列表
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        // 更新棋盘记录的位置：更新currentMove后currentSquares会自动更新
        setCurrentMove(nextHistory.length - 1);
        // 切换下一位棋手的棋子
        setPlayerFlag((prevState) => ({
            list: prevState.list,
            next: prevState.next === 0 ? 1 : 0,
        }));
    };

    /** 渲染组件 */
    return (
        <div>
            {/* 显示当前下棋的棋手 */}
            <div>下一位棋手是：{playerFlag.list[playerFlag.next]}</div>
            {/* 渲染棋盘组件 */}
            <Board
                squares={currentSquares}
                nextFlag={playerFlag.list[playerFlag.next]}
                onPlay={handlePlay}
            />
            {/* 时间旅行 */}
            <p>时间旅行</p>
            <ol>{timeTravelItemList}</ol>
        </div>
    );
};

/** 导出井字棋组件供其他部分使用 */
export default TicTacToe;
