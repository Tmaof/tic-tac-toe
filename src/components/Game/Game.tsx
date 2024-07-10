import React, { useState } from 'react';
import './Game.scss';
import Chess from '../Chess/Chess';
import { getGameConfigList } from './utils';

/** 各种游戏模式配置的一个列表 */
const configList = getGameConfigList();
/** 用于渲染的模式选择列表 */
const selectList = configList.map((config, index) => {
    return {
        name: config.name,
        configIndex: index,
    };
});

/** 游戏组件定义 */
const Game: React.FC = () => {
    /** 当前选择的模式索引 */
    const [currentModeIndex, setCurrentModeIndex] = useState(0);

    return (
        <div className="game-container">
            {/* 游戏模式选择区域 */}
            <div className="mode-select">
                {
                    selectList.map(({ name, configIndex }) => {
                        return (
                            <label key={configIndex}>
                                <input
                                    type="radio"
                                    name="mode"
                                    value={configIndex}
                                    checked={currentModeIndex === configIndex}
                                    onChange={() => setCurrentModeIndex(configIndex)}
                                />
                                {name}
                            </label>
                        );
                    })
                }

            </div>
            {/* 游戏视图区域，根据模式显示不同的游戏组件 */}
            <div className='game-view'>
                {
                    configList.map((config, index) => {
                        return (currentModeIndex === index) && <Chess key={index} {...config.ChessProps} ></Chess>;
                    })
                }
            </div>
        </div>
    );
};

export default Game;
