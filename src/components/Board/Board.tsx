import React from 'react';
import './Board.scss';
import { BoardProps } from './Board.type';

/** 棋盘组件，用于渲染棋盘和处理下棋逻辑 */
const Board: React.FC<BoardProps> = (props) => {
    const {
        latticeWidth = '50px',
        squares,
        nextFlag,
        onPlay,
    } = props;

    /**
     * 处理格子的点击事件，实现下棋逻辑
     * @param row 格子的行号
     * @param col 格子的列号
     */
    const handleClick = function handleClick (row: number, col: number) {
        if (squares[row][col]) return; // 如果格子有值了，则无需操作
        const nextSquares = JSON.parse(JSON.stringify(squares)); // 复制当前棋盘状态，注意：由于是二维数组，需要深拷贝，否则时间回溯将出现bug
        nextSquares[row][col] = nextFlag; // 在点击位置放置棋子
        onPlay(nextSquares, col, row); // 触发回调，更新棋盘状态
    };

    /** 渲染棋盘 */
    return (
        <div className="board-container">
            {/* 遍历二维列表，渲染每个格子 */}
            {squares.map((list, row) => {
                return (<div key={row} className='board-row'>
                    {list.map(((value, col) => (<div
                        className="square"
                        style={{ width: latticeWidth, height: latticeWidth }  }
                        onClick={() => handleClick(row, col)}
                        key={col}
                    >
                        {value}
                    </div>)))}
                </div>);
            })}
        </div>
    );
};

export default Board;
