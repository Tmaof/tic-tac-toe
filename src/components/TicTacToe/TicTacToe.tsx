import { useEffect, useState } from 'react'
import Board from '../Board/Board' // 导入棋盘组件
import type { SquaresList } from '../Board/Board' // 导入棋盘格子列表的类型定义

/** 计算井字棋的胜利者 */
const calculateWinner = function calculateWinner(squares: SquaresList) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

/** 获取初始棋盘数据 */
const getInitSquares = function getInitSquares(): SquaresList {
  return Array(9).fill(null)
}

/** 井字棋游戏组件 */
const TicTacToe: React.FC = () => {
  /** 棋盘状态，初始化为9个null，表示所有格子都是空的 */
  const [squares, setSquares] = useState<SquaresList>(getInitSquares())

  /** 棋手状态，包含棋手列表和当前棋手的索引 */
  const [playerFlag, setPlayerFlag] = useState({
    list: ['X', 'O'],
    next: 0
  })

  /** 监听棋盘的改变 */
  useEffect(() => {
    // 下完一棋后需要判断是否存在胜利者
    const winner = calculateWinner(squares)
    if (winner) {
      window.confirm(`棋手${winner}胜利了！`)
    }
  }, [squares])

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
