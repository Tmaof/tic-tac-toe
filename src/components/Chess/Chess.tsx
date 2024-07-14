import { PureComponent } from 'react';
import Board from '../Board/Board';
import { ChessProps, PlayerInfo } from './Chess.type';
import { calculateNextMove, calculateWinner } from '../../utils';
import { RootState } from '../../store';
import { HistoryInfo, HistoryObj } from '../../store/modules/history/reducer.type';
import { connect } from 'react-redux';
import { getInitHistoryInfo, setCurrentHistoryIndexUtil, setHistoryListUtil } from '../../store/modules/history/utils';

/** 映射状态到组件的props */
const mapStateToProps = (state: RootState) => {
    return { historyInfoMap: state.history };
};

type AllChessProps = ChessProps & ReturnType<typeof mapStateToProps>;

type AllChessState = HistoryInfo & {currentHistory:HistoryObj}

/**
 * 查找AI玩家或者人类玩家在玩家列表中的索引
 * @param playerList 玩家列表
 * @param isAI 是否是查找AI玩家
 * @returns
 */
const getPlayerIndex = (playerList: PlayerInfo[], isAI:boolean) => {
    return playerList.findIndex(player => player.isAI === isAI);
};

/** 棋类游戏组件 */
class Chess extends PureComponent<AllChessProps, AllChessState> {
    constructor (props: AllChessProps) {
        super(props);
        // 初始化棋盘历史信息
        const { historyList, currentHistoryIndex } = getInitHistoryInfo(this.props.rowNum, this.props.colNum);
        const currentHistory = historyList[currentHistoryIndex];
        const isAIFirst = Math.random() > 0.5 && this.props.isAIMode;
        if (isAIFirst) {
            // 如果是AI先手，那么它查找它在玩家列表中的索引，并设置为下一个玩家的索引
            currentHistory.nextPlayerIndex = getPlayerIndex(this.props.playerInfoList, true);
        }
        this.state = {
            historyList,
            currentHistory,
            currentHistoryIndex,
        };
        if (isAIFirst) {
            // AI先手，那么AI先下棋
            this.aIPlaysChess();
        }
    }
    /** 每次更新时，获取一个派生的state从props */
    static getDerivedStateFromProps (nextProps: AllChessProps, prevState: AllChessState) {
        /** 各个棋盘历史信息的Map */
        const { historyInfoMap, configId } = nextProps;
        /** 用当前棋盘的id去获取当前棋盘的历史信息 */
        const history = historyInfoMap.get(configId);
        if (!history) return prevState; // 初次渲染时historyInfoMap还没有该棋盘的历史信息
        const { historyList, currentHistoryIndex } = history;
        return { ...prevState, ...history, currentHistory: historyList[currentHistoryIndex] };
    }

    /** 组件更新 */
    componentDidUpdate (): void {
        // 如果是AI模式且下一位棋手是AI，则需要AI下棋
        this.aIPlaysChess();
    }

    /**
     * 处理下棋的函数
     * @param posY 当次下棋位置的纵坐标
     * @param posX 当次下棋位置的横坐标
     * @param isAICall 是否是AI调用
     * @returns
     */
    handlePlay = (posY:number, posX:number, isAICall = false) => {
        const {  successNeedNum, playerInfoList, configId } = this.props;
        const { historyList, currentHistoryIndex, currentHistory } = this.state;
        const player = playerInfoList[currentHistory.nextPlayerIndex];

        if (currentHistory.squares[posY][posX]) return; // 如果格子有值了，则无需操作
        if (player.isAI && !isAICall) return; // 如果当前是AI下棋，则不允许玩家进行下棋操作
        if (currentHistory.gameOver) return; // 游戏已经结束

        const nextSquares = JSON.parse(JSON.stringify(currentHistory.squares)); // 复制当前棋盘状态，注意：由于是二维数组，需要深拷贝，否则时间回溯将出现bug
        nextSquares[posY][posX] = player.flag; // 在点击位置放置棋子

        // 下完一棋后需要判断是否存在胜利者
        const { winner, onLinePointPosList  } = calculateWinner(nextSquares, successNeedNum, { posY, posX });
        if (winner) {
            // 存在胜利者，游戏结束
            window.confirm(`棋手${winner}胜利了！`);
        }

        /** 新的下一个棋手的索引 */
        const nextPlayerIndex = (currentHistory.nextPlayerIndex + 1) % playerInfoList.length;
        /** 新的历史记录对象 */
        const newHistory: HistoryObj = { squares: nextSquares, nextPlayerIndex, onLinePointPosList, gameOver: winner !== null };
        // 将新的历史状态添加到历史列表
        const newHistoryList = [...historyList.slice(0, currentHistoryIndex + 1), newHistory];
        setHistoryListUtil(configId, newHistoryList);
        // 更新棋盘记录的位置：更新索引后currentHistory会自动更新
        setCurrentHistoryIndexUtil(configId, newHistoryList.length - 1);
    };

    /** AI下棋 */
    aIPlaysChess = () => {
        if (!this.props.isAIMode) return;
        const { playerInfoList, successNeedNum } = this.props;
        const { currentHistory } = this.state;
        const player = playerInfoList[currentHistory.nextPlayerIndex];
        if (!player.isAI) return;

        // 调用计算下棋位置的方法获取位置，并下棋
        const opponentPlayer = playerInfoList[getPlayerIndex(playerInfoList, false)];
        const { posY, posX } = calculateNextMove(currentHistory.squares, player.flag, opponentPlayer.flag, successNeedNum);
        if (posY < 0 || posX < 0) return;
        setTimeout(() => {
            this.handlePlay(posY, posX, true);
        }, 300);
    };

    render () {
        const { playerInfoList, configId  } = this.props;
        const { historyList, currentHistory } = this.state;
        const player = playerInfoList[currentHistory.nextPlayerIndex];

        return (
            <div>
                {/* 显示当前下棋的棋手 */}
                <div>下一位棋手是：{`${player.name}（${player.flag}）`}</div>
                {/* 渲染棋盘组件 */}
                <Board
                    squares={currentHistory.squares}
                    onPlay={this.handlePlay}
                    onLinePointPosList={currentHistory.onLinePointPosList}
                />
                {/* 时间旅行 */}
                <p>时间旅行：</p>
                <ul>
                    {/* 计算时间旅行的每一项元素 */}
                    {
                        historyList.map((history, index) => {
                            const description = index > 0 ? `回到状态 #${index}-${playerInfoList[history.nextPlayerIndex].name}` : '回到游戏开始';
                            return (
                                <li key={index}>
                                    <button onClick={() => setCurrentHistoryIndexUtil(configId, index)}>{description}</button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}


export default connect(mapStateToProps)(Chess);

