import { PureComponent } from 'react';
import './Board.scss';
import { BoardProps } from './Board.type';
import Checkerboard from '../Checkerboard/Checkerboard';
import { PosInfo } from '../../utils/index.type';

/** 棋盘组件，用于渲染棋盘和处理下棋逻辑 */
class Board extends PureComponent<BoardProps> {
    /**
     * 处理格子的点击
     * @param pos 格子的位置
     */
    handleClickCheckerboard = (pos:PosInfo) => {
        this.props.onPlay(pos);
    };

    render () {
        const { squares, onLinePointPosList } = this.props;
        return (
            <div className="board-container">
                {/* 遍历二维列表，渲染每个格子 */}
                {squares.map((list, row) => {
                    return (<div key={row} className='board-row'>
                        {list.map(((value, col) => (<Checkerboard
                            key={col}
                            isActive={onLinePointPosList.some(pos => pos.posY === row && pos.posX === col)}
                            posY={row}
                            posX={col}
                            flag={value}
                            onClickCheckerboard={ this.handleClickCheckerboard }
                        ></Checkerboard>)))}
                    </div>);
                })}
            </div>
        );
    }
}

export default Board;
