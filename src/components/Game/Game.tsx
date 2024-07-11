import React, { useEffect } from 'react';
import './Game.scss';
import Chess from '../Chess/Chess';
import { getGameConfigListAPI } from '../../apis/game';
import { useAppDispatch, useAppSelector } from '../../store';
import { setGameConfigList, setCurrentConfigId } from '../../store/modules/game/actions';


/** 游戏组件定义 */
const Game: React.FC = () => {
    const dispatch = useAppDispatch();
    const configList = useAppSelector((state) => state.game.gameConfigList);
    const currentConfigId = useAppSelector((state) => state.game.currentConfigId);
    /** 组件挂载后，获取游戏配置列表 */
    useEffect(() => {
        getGameConfigListAPI().then((configList) => {
            dispatch(setGameConfigList(configList));
            dispatch(setCurrentConfigId(configList[0].id));
        },);
    }, []);

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
                                    onChange={() => dispatch(setCurrentConfigId(config.id))}
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
};

export default Game;
