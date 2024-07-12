import  { PureComponent } from 'react';
import './Game.scss';
import Chess from '../Chess/Chess';
import { getGameConfigListAPI } from '../../apis/game';
import { RootState,  } from '../../store';
import { connect } from 'react-redux';
import { setCurrentConfigIdUtil, setGameConfigListUtil } from '../../store/modules/game/utils';


/** 映射状态到Game组件的props */
const mapStateToProps = (state:RootState) => {
    return {
        configList: state.game.gameConfigList,
        currentConfigId: state.game.currentConfigId,
    };
};

type GameProps = ReturnType<typeof mapStateToProps>;

/** 游戏组件定义 */
class Game extends PureComponent<GameProps> {
    /** 组件挂载后，获取游戏配置列表 */
    async componentDidMount () {
        const configList = await getGameConfigListAPI();
        setGameConfigListUtil(configList);
        setCurrentConfigIdUtil(configList[0].id);
    }

    render () {
        const { configList, currentConfigId } = this.props;
        return (
            <div className="game-container">
                {/* 游戏模式选择区域 */}
                <div className="mode-select">
                    {
                        configList.map((config) => {
                            return (
                                <label key={config.id}>
                                    <input
                                        type="radio"
                                        name="mode"
                                        value={config.id}
                                        checked={currentConfigId === config.id}
                                        onChange={() => setCurrentConfigIdUtil(config.id)}
                                    />
                                    {config.name}
                                </label>
                            );
                        })
                    }
                </div>
                {/* 游戏视图区域，根据模式显示不同的游戏组件 */}
                <div className='game-view'>
                    {
                        configList.map((config) => {
                            return (currentConfigId === config.id) && <Chess configId={config.id} key={config.id} {...config.ChessProps} ></Chess>;
                        })
                    }
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps)(Game);
