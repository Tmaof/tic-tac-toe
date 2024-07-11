import { PureComponent } from 'react';
import Board from '../Board/Board';
import { ChessProps } from './Chess.type';
import { getInitHistoryList } from './utils';
import { SquaresList } from '../Board/Board.type';
import { calculateWinner } from '../../utils';
import { RootState } from '../../store';
import { setHistoryList, setCurrentHistoryIndex, resetHistory } from '../../store/modules/history/action';
import { HistoryObj } from '../../store/modules/history/reducer.type';
import { connect } from 'react-redux';

/** 映射状态到组件的props */
const mapStateToProps = (state: RootState) => {
    return {
        historyList: state.history.historyList,
        currentHistoryIndex: state.history.currentHistoryIndex,
    };
};

const mapDispatchToProps = {
    setHistoryList,
    setCurrentHistoryIndex,
    resetHistory,
};

type  AllChessProps = ChessProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

/** 棋类游戏组件 */
class Chess extends PureComponent<AllChessProps> {
    componentDidMount () {
        const { rowNum, colNum } = this.props;
        /** 组件挂载后，初始化历史记录列表 */
        this.props.setHistoryList(getInitHistoryList(rowNum, colNum));
        setCurrentHistoryIndex(0);
    }

    componentWillUnmount () {
        /** 组件卸载时，重置历史列表 */
        this.props.resetHistory();
    }

    /**
     * 处理下棋的函数
     * @param {SquaresList} nextSquares - 更新后的棋盘状态
     * @param posX 当次下棋位置的横坐标
     * @param posY 当次下棋位置的纵坐标
     * @returns
     */
    handlePlay = (nextSquares: SquaresList, posX:number, posY:number) => {
        const { historyList, currentHistoryIndex, successNeedNum, playerInfoList, setHistoryList, setCurrentHistoryIndex } = this.props;
        const currentHistory = historyList[currentHistoryIndex];
        if (currentHistory.gameOver) {
            window.confirm('游戏已经结束了！');
            return;
        }
        // 下完一棋后需要判断是否存在胜利者
        const { winner, onLinePointPosList  } = calculateWinner(nextSquares, successNeedNum, posX, posY);
        if (winner) {
            // 存在胜利者，游戏结束
            window.confirm(`棋手${winner}胜利了！`);
        }
        /** 新的下一个棋手的索引 */
        const nextPlayerIndex = (currentHistory.nextPlayerIndex + 1) % playerInfoList.length;
        /** 新的历史记录对象 */
        const newHistory:HistoryObj = { squares: nextSquares, nextPlayerIndex, onLinePointPosList, gameOver: winner !== null };
        // 将新的历史状态添加到历史列表
        const newHistoryList = [...historyList.slice(0, currentHistoryIndex + 1), newHistory];
        setHistoryList(newHistoryList);
        // 更新棋盘记录的位置：更新索引后currentHistory会自动更新
        setCurrentHistoryIndex(newHistoryList.length - 1);
    };


    render () {
        const { historyList, currentHistoryIndex, setCurrentHistoryIndex, playerInfoList } = this.props;
        const currentHistory = historyList[currentHistoryIndex];

        return (
            <div>
                {/* 显示当前下棋的棋手 */}
                <div>下一位棋手是：{playerInfoList[currentHistory.nextPlayerIndex].flag}</div>
                {/* 渲染棋盘组件 */}
                <Board
                    squares={currentHistory.squares}
                    nextFlag={playerInfoList[currentHistory.nextPlayerIndex].flag}
                    onPlay={this.handlePlay}
                    onLinePointPosList={currentHistory.onLinePointPosList}
                />
                {/* 时间旅行 */}
                <p>时间旅行：</p>
                <ul>
                    {/* 计算时间旅行的每一项元素 */}
                    {
                        historyList.map((_history, index) => {
                            const description = index > 0 ? `回到状态 #${index}` : '回到游戏开始';
                            return (
                                <li key={index}>
                                    <button onClick={() => setCurrentHistoryIndex(index)}>{description}</button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Chess);
