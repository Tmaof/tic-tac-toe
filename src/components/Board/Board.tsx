import { PureComponent } from 'react';
import './Board.scss';
import { BoardProps } from './Board.type';
import classNames from 'classnames';

/** 棋盘组件，用于渲染棋盘和处理下棋逻辑 */
class Board extends PureComponent<BoardProps> {
    static defaultProps = { latticeWidth: '50px' };

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
                            onClick={() => this.props.onPlay(row, col)}
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
