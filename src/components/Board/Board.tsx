import { PureComponent } from 'react';
import './Board.scss';
import { BoardProps } from './Board.type';
import classNames from 'classnames';

/** 棋盘组件，用于渲染棋盘和处理下棋逻辑 */
class Board extends PureComponent<BoardProps> {
    static defaultProps = { latticeWidth: '50px' };
    /**
     * 处理格子的点击事件，实现下棋逻辑
     * @param row 格子的行号
     * @param col 格子的列号
     */
    handleClick = (row: number, col: number) => {
        const { squares, nextFlag, onPlay } = this.props;
        if (squares[row][col]) return; // 如果格子有值了，则无需操作
        const nextSquares = JSON.parse(JSON.stringify(squares)); // 复制当前棋盘状态，注意：由于是二维数组，需要深拷贝，否则时间回溯将出现bug
        nextSquares[row][col] = nextFlag; // 在点击位置放置棋子
        onPlay(nextSquares, col, row); // 触发回调，更新棋盘状态
    };

    render () {
        const { latticeWidth, squares, onLinePointPosList } = this.props;
        return (
            <div className="board-container">
                {/* 遍历二维列表，渲染每个格子 */}
                {squares.map((list, row) => {
                    return (<div key={row} className='board-row'>
                        {list.map(((value, col) => (<div
                            // 为胜利时在一条线上的点添加高亮样式
                            className={classNames('square', { 'active-square': onLinePointPosList.some(pos => pos.posY === row && pos.posX === col) })}
                            style={{ width: latticeWidth, height: latticeWidth }  }
                            onClick={() => this.handleClick(row, col)}
                            key={col}
                        >
                            {value}
                        </div>)))}
                    </div>);
                })}
            </div>
        );
    }
}

export default Board;
