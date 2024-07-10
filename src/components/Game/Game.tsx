import React, { useState } from 'react';
import './Game.scss';
import Chess from '../Chess/Chess';
import { getGameConfigList } from './utils';

/** 各种游戏模式配置的一个列表 */
const configList = getGameConfigList();

/** 游戏组件定义 */
const Game: React.FC = () => {
    /** 当前选择的模式的id */
    const [currentModeId, setCurrentModeId] = useState(1);

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
                                    checked={currentModeId === config.id}
                                    onChange={() => setCurrentModeId(config.id)}
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
                        return (currentModeId === config.id) && <Chess key={config.id} {...config.ChessProps} ></Chess>;
                    })
                }
            </div>
        </div>
    );
};

export default Game;
