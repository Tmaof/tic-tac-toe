import  { PureComponent } from 'react';
import './Game.scss';
import Chess from '../Chess/Chess';
import { getGameConfigListAPI } from '../../apis/game';
import { RootState,  } from '../../store';
import { setGameConfigList, setCurrentConfigId } from '../../store/modules/game/actions';
import { connect } from 'react-redux';


/** 映射状态到Game组件的props */
const mapStateToProps = (state:RootState) => {
    return {
        configList: state.game.gameConfigList,
        currentConfigId: state.game.currentConfigId,
    };
};

/** 映射dispatch到Game组件的props */
// const mapDispatchToProps = (dispatch:AppDispatch) => (
//     {
//         setGameConfigList: (gameConfigList: GameConfig[]) => dispatch(setGameConfigList(gameConfigList)),
//         setCurrentConfigId: (currentId: number) => dispatch(setCurrentConfigId(currentId)),
//     }
// );
// type GameProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

/** 包含 action creater 函数的一个对象，映射到组件props并调用时会自动dispatch，如：dispatch(setGameConfigList())  */
const mapDispatchToProps = {
    setGameConfigList,
    setCurrentConfigId,
};

type GameProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;


/** 游戏组件定义 */
class Game extends PureComponent<GameProps> {
    /** 组件挂载后，获取游戏配置列表 */
    componentDidMount () {
        getGameConfigListAPI().then((configList) => {
            this.props.setGameConfigList(configList);
            this.props.setCurrentConfigId(configList[0].id);
        });
    }

    render () {
        const { configList, currentConfigId, setCurrentConfigId } = this.props;
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
                                        onChange={() => setCurrentConfigId(config.id)}
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
                            return (currentConfigId === config.id) && <Chess key={config.id} {...config.ChessProps} ></Chess>;
                        })
                    }
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Game);
