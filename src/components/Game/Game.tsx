import React, { useState } from 'react';
import Backgammon from '../Backgammon/Backgammon'; // 导入五子棋组件
import TicTacToe from '../TicTacToe/TicTacToe'; // 导入井字棋组件
import './Game.scss'; // 导入样式文件

/**
 * 定义游戏模式枚举
 */
enum MODE {
  /** 井字棋模式 */
  TICTACTOE = 'TICTACTOE',
  /** 五子棋模式 */
  BACKGAMMON = 'BACKGAMMON'
}

/**
 * Game组件定义
 */
const Game: React.FC = () => {
  // 使用useState钩子初始化游戏模式状态为井字棋
  const [mode, setMode] = useState<MODE>(MODE.TICTACTOE);

  /**
   * 处理模式切换的事件
   */
  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(
      event.target.value === MODE.TICTACTOE ? MODE.TICTACTOE : MODE.BACKGAMMON
    );
  };

  /**
   * 根据当前模式获取对应的游戏组件
   */
  const getGameComponent = () => {
    if (mode === MODE.TICTACTOE) {
      return <TicTacToe />;
    } else if (mode === MODE.BACKGAMMON) {
      return <Backgammon />;
    }
  };

  return (
    <div className="game-container">
      {/* 游戏模式选择区域 */}
      <div className="mode-select">
        <label>
          <input
            type="radio"
            name="mode"
            value={MODE.TICTACTOE}
            checked={mode === MODE.TICTACTOE}
            onChange={handleModeChange}
          />
          井字棋
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value={MODE.BACKGAMMON}
            checked={mode === MODE.BACKGAMMON}
            onChange={handleModeChange}
          />
          五子棋
        </label>
      </div>
      {/* 游戏视图区域，根据模式显示不同的游戏组件 */}
      <div className='game-view'>
        {getGameComponent()}
      </div>
    </div>
  );
};

export default Game; // 导出Game组件