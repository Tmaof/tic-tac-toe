import { useEffect, useMemo, useState } from 'react';
import Board, { SquaresList } from '../Board/Board'; // 导入棋盘格子列表的类型定义

/** 计算五子棋的胜利者 */
const calculateWinner = function calculateWinner (squares: SquaresList) {
    const lines = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 13, 12, 16, 20],
    ];
    for (let index = 0; index < lines.length; index++) {
        const [one, two, three, four, five] = lines[index];
        if (squares[one] && squares[one] === squares[two] && squares[one] === squares[three] && squares[one] === squares[four] && squares[one] === squares[five]) {
            return squares[one];
        }
    }
    return null;
};

/** 获取初始棋盘数据 */
const getInitSquares = function getInitSquares (): SquaresList {
    return Array(25).fill(null);
};

/** 五子棋游戏组件 */
const Backgammon: React.FC = () => {
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
        list: ['⚫', '⚪'],
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
                numberOfEachRow={5}
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

/** 导出五子棋组件供其他部分使用 */
export default Backgammon;
