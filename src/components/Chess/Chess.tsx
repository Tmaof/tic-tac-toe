import { useMemo, useState } from 'react';
import Board from '../Board/Board';
import { ChessProps, HistoryList, HistoryObj } from './Chess.type';
import { getInitHistoryList } from './utils';
import { SquaresList } from '../Board/Board.type';
import { calculateWinner } from '../../utils';

/** 棋类游戏组件 */
const Chess: React.FC<ChessProps> = (props) => {
    /** 棋盘状态历史记录的列表 */
    const [historyList, setHistoryList] = useState<HistoryList>(getInitHistoryList(props.rowNum, props.colNum));
    /** 当前棋盘记录的位置 */
    const [currentMove, setCurrentMove] = useState(0);
    /** 计算当前的棋盘历史状态 */
    const currentHistory = useMemo(() => {
        return historyList[currentMove];
    }, [currentMove, historyList]);
    /**
    * 处理时间旅行
    * @param index 历史记录的索引
    */
    const handleTimeTrave =  (index: number) => {
        // 更新当前历史记录的索引
        setCurrentMove(index);
    };
    /** 计算时间旅行的每一项元素 */
    const timeTravelItemList = useMemo(() => {
        return historyList.map((_history, index) => {
            const description = index > 0 ? `回到状态 #${index}` : '回到游戏开始';
            return (
                <li key={index}>
                    <button onClick={() => handleTimeTrave(index)}>{description}</button>
                </li>
            );
        });
    }, [historyList]);

    /**
     * 处理下棋的函数
     * @param {SquaresList} nextSquares - 更新后的棋盘状态
     */
    const handlePlay =  (nextSquares: SquaresList, posX:number, posY:number) => {
        if (currentHistory.gameOver) {
            window.confirm('游戏已经结束了！');
            return;
        }
        // 下完一棋后需要判断是否存在胜利者
        const { winner, onLinePointPosList  } = calculateWinner(nextSquares, props.successNeedNum, posX, posY);
        if (winner) {
            // 存在胜利者，游戏结束
            window.confirm(`棋手${winner}胜利了！`);
        }
        /** 新的下一个棋手的索引 */
        const nextPlayerIndex = (currentHistory.nextPlayerIndex + 1) % props.playerInfoList.length;
        /** 新的历史记录对象 */
        const newHistory:HistoryObj = { squares: nextSquares, nextPlayerIndex, onLinePointPosList, gameOver: winner !== null };
        // 将新的历史状态添加到历史列表
        const newHistoryList = [...historyList.slice(0, currentMove + 1), newHistory];
        setHistoryList(newHistoryList);
        // 更新棋盘记录的位置：更新currentMove后currentHistory会自动更新
        setCurrentMove(newHistoryList.length - 1);
    };

    /** 渲染组件 */
    return (
        <div>
            {/* 显示当前下棋的棋手 */}
            <div>下一位棋手是：{props.playerInfoList[currentHistory.nextPlayerIndex].flag}</div>
            {/* 渲染棋盘组件 */}
            <Board
                squares={currentHistory.squares}
                nextFlag={props.playerInfoList[currentHistory.nextPlayerIndex].flag}
                onPlay={handlePlay}
                onLinePointPosList={currentHistory.onLinePointPosList}
            />
            {/* 时间旅行 */}
            <p>时间旅行：</p>
            <ul>{timeTravelItemList}</ul>
        </div>
    );
};

export default Chess;