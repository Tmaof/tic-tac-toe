import { PureComponent } from 'react';
import Board from '../Board/Board';
import { calculateNextMove, calculateWinner } from '../../utils';
import { HistoryObj } from '../../store/modules/history/reducer.type';
import { getHistoryStateByConfigId, setCurrentHistoryIndexUtil, setHistoryListUtil } from '../../store/modules/history/utils';
import { PosInfo } from '../../utils/index.type';
import { getPlayerIndex, getWinnerInfo } from './utils';
import { ChessProps } from './Chess.type';
import { RootState } from '../../store';
import { connect } from 'react-redux';

/** 映射状态到组件的props */
const mapStateToProps = (state: RootState) => {
    return { historyInfoMap: state.history };
};

type AllChessProps = ChessProps & ReturnType<typeof mapStateToProps>;


/** 棋类游戏组件 */
class Chess extends PureComponent<AllChessProps> {
    /** 当前AI是否正在下棋 */
    isAIplaying = false;

    /** 组件挂载 */
    componentDidMount () {
        const { playerInfoList, configId, rowNum, colNum } = this.props;
        const { currentHistory } = getHistoryStateByConfigId(configId, rowNum, colNum);
        const player = playerInfoList[currentHistory.nextPlayerIndex];
        // AI先手，那么AI先下棋
        if (player.isAI) this.handleAIPlay(currentHistory);
    }

    /**
     * 处理下棋的函数
     * @param pos 当前棋子的位置
     * @returns 成功时返回最新的历史信息，失败时返回undefined
     */
    handlePlay = (pos: PosInfo) => {
        const { successNeedNum, playerInfoList, configId, rowNum, colNum } = this.props;
        const { historyList, currentHistoryIndex, currentHistory } = getHistoryStateByConfigId(configId, rowNum, colNum);
        const player = playerInfoList[currentHistory.nextPlayerIndex];
        const { posY, posX } = pos;

        if (currentHistory.squares[posY][posX]) return; // 如果格子有值了，则无需操作
        if (currentHistory.status !== 'playing') return; // 游戏已经结束

        const nextSquares = JSON.parse(JSON.stringify(currentHistory.squares)); // 复制当前棋盘状态，注意：由于是二维数组，需要深拷贝，否则时间回溯将出现bug
        nextSquares[posY][posX] = player.flag; // 在点击位置放置棋子

        // 下完一棋后需要判断是否存在胜利者
        const { flag, onLinePointPosList, status } = calculateWinner(nextSquares, successNeedNum, pos);
        const winner = getWinnerInfo(playerInfoList, flag);

        /** 新的下一个棋手的索引 */
        const nextPlayerIndex = (currentHistory.nextPlayerIndex + 1) % playerInfoList.length;
        /** 新的历史记录对象 */
        const newHistory: HistoryObj = { squares: nextSquares, nextPlayerIndex, onLinePointPosList, status, winner };
        // 将新的历史状态添加到历史列表
        const newHistoryList = [...historyList.slice(0, currentHistoryIndex + 1), newHistory];
        setHistoryListUtil(configId, newHistoryList);
        // 更新棋盘记录的位置：更新索引后currentHistory会自动更新
        setCurrentHistoryIndexUtil(configId, newHistoryList.length - 1);

        return newHistory;
    };

    /**
     * 处理玩家点击下棋的函数
     * @param pos 当前棋子的位置
     * @returns
     */
    handlePlayerPlay = (pos: PosInfo) => {
        const { playerInfoList, configId, rowNum, colNum } = this.props;
        const { currentHistory } = getHistoryStateByConfigId(configId, rowNum, colNum);
        const player = playerInfoList[currentHistory.nextPlayerIndex];
        if (player.isAI) return; // 如果当前是AI下棋，则不允许玩家进行下棋操作
        // 玩家下棋
        const newHistory = this.handlePlay(pos);
        // 当玩家下棋后需要AI继续下棋，AI下棋后不会调用该方法（保证不会发生死循环）
        if (newHistory && newHistory.status === 'playing') this.handleAIPlay(newHistory);
    };

    /**
     * AI下棋
     * @param currentHistory 当前最新的棋盘记录，例如玩家下完棋后调用该方法时需要传入最新的棋盘记录（例如包含最新的棋盘二维列表squares），AI才能根据最新的棋盘记录进行正确下棋
     * @returns
     */
    handleAIPlay = (currentHistory: HistoryObj) => {
        if (!this.props.isAIMode) return;
        const { playerInfoList, successNeedNum } = this.props;
        const player = playerInfoList[currentHistory.nextPlayerIndex];
        if (!player.isAI) return;

        // 调用计算下棋位置的方法获取位置，并下棋
        const opponentPlayer = playerInfoList[getPlayerIndex(playerInfoList, false)];
        const { posY, posX } = calculateNextMove(currentHistory.squares, player.flag, opponentPlayer.flag, successNeedNum);
        if (posY < 0 || posX < 0) return; // 棋盘已满
        this.isAIplaying = true; // 设置AI正在下棋中，不能进行时间回溯
        setTimeout(() => {
            this.handlePlay({ posY, posX });
            this.isAIplaying = false; // AI下棋完成
        }, 300);
    };

    /** 处理时间旅行 */
    handleTimeTravel = (index:number) => {
        if (this.isAIplaying) return window.confirm('请等待AI下棋完成！');// AI正在下棋中，不能进行时间回溯
        const { playerInfoList, rowNum, colNum, configId } = this.props;
        const { historyList } = getHistoryStateByConfigId(configId, rowNum, colNum);
        const history = historyList[index];
        const player = playerInfoList[history.nextPlayerIndex];
        if (player.isAI) return window.confirm('只能回到自己的状态');
        setCurrentHistoryIndexUtil(configId, index);
    };

    /** 获取游戏状态的文本 */
    getGameStatusText = () => {
        const { playerInfoList, configId, rowNum, colNum } = this.props;
        const { currentHistory } = getHistoryStateByConfigId(configId, rowNum, colNum);
        const { status, winner } = currentHistory;
        const player = playerInfoList[currentHistory.nextPlayerIndex];
        switch (status) {
            case 'playing':
                return `🎮游戏进行中...\n👤下一位棋手是：${player.name}（${player.flag}）`;
            case 'success':
                return `🏆【${winner?.name}】胜利！`;
            case 'draw':
                return '⚖︎平局';
            default:
                return '未知状态';
        }
    };

    render () {
        const { playerInfoList, configId, rowNum, colNum } = this.props;
        const { historyList, currentHistory } = getHistoryStateByConfigId(configId, rowNum, colNum);

        return (
            <div>
                {/* 显示比赛状态 */}
                <div style={{ whiteSpace: 'pre' }}>{this.getGameStatusText()}</div>
                {/* 渲染棋盘组件 */}
                <Board
                    squares={currentHistory.squares}
                    onPlay={this.handlePlayerPlay}
                    onLinePointPosList={currentHistory.onLinePointPosList}
                />
                {/* 时间旅行 */}
                <p>时间旅行：</p>
                <ul>
                    {/* 计算时间旅行的每一项元素 */}
                    {
                        historyList.map((history, index) => {
                            const description = `回到状态 #${index}-${playerInfoList[history.nextPlayerIndex].name}`;
                            return (
                                <li key={index}>
                                    <button onClick={() => this.handleTimeTravel(index)}>{description}</button>
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
