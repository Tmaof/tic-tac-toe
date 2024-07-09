import { useState } from 'react'
import Board from '../Board/Board' // 导入棋盘组件
import type { SquaresList } from '../Board/Board' // 导入棋盘格子列表的类型定义

/** 井字棋游戏组件 */
const TicTacToe: React.FC = () => {
  /** 棋盘状态，初始化为9个null，表示所有格子都是空的 */
  const [squares, setSquares] = useState<SquaresList>(Array(9).fill(null))

  /** 棋手状态，包含棋手列表和当前棋手的索引 */
  const [playerFlag, setPlayerFlag] = useState({
    list: ['X', 'O'],
    next: 0
  })

  /**
   * 处理下棋的函数
   * @param {SquaresList} nextSquares - 更新后的棋盘状态
   */
  const handlePlay = function handlePlay(nextSquares: SquaresList) {
    // 更新棋盘状态
    setSquares(nextSquares)
    // 切换下一位棋手的棋子
    setPlayerFlag((prevState) => ({
      list: prevState.list,
      next: prevState.next === 0 ? 1 : 0
    }))
  }

  /** 渲染组件 */
  return (
    <div>
      {/* 显示当前下棋的棋手 */}
      <div>下一位棋手是：{playerFlag.list[playerFlag.next]}</div>
      {/* 渲染棋盘组件 */}
      <Board
        squares={squares}
        nextFlag={playerFlag.list[playerFlag.next]}
        onPlay={handlePlay}
      />
    </div>
  )
}

/** 导出井字棋组件供其他部分使用 */
export default TicTacToe
