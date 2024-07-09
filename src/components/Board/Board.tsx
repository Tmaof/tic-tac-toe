import React, { useMemo } from 'react'
import './Board.scss' // 导入棋盘的样式文件

/** 定义棋盘上所有格子的类型，可以是字符串表示棋子，或null表示空 */
export type SquaresList = (string | null)[]

/** 定义Board组件的属性类型 */
type BoardProps = {
  /** 每个格子的宽度，默认为50px */
  latticeWidth?: number
  /** 每一行格子的数量，默认为3 */
  numberOfEachRow?: number
  /** 所有格子的一个列表，每个元素可以是字符串或null */
  squares: SquaresList
  /** 下一个棋子的样式 */
  nextFlag: string
  /** 完成一次下棋后触发的回调函数，参数为更新后的棋盘格子列表 */
  onPlay: (squares: SquaresList) => void
}

/** Board组件定义，用于渲染棋盘和处理下棋逻辑 */
const Board: React.FC<BoardProps> = (props) => {
  const {
    latticeWidth = 50,
    numberOfEachRow = 3,
    squares,
    nextFlag,
    onPlay
  } = props

  /** useMemo优化：计算外层棋盘的总宽度，依赖于格子宽度和每行格子数量 */
  const totalWidth = useMemo(() => {
    return `${latticeWidth * numberOfEachRow}px`
  }, [latticeWidth, numberOfEachRow])

  /** useMemo优化：计算每个格子的样式，依赖于格子宽度 */
  const squareStyle = useMemo<React.CSSProperties>(() => {
    return {
      width: `${latticeWidth}px`,
      height: `${latticeWidth}px`
    }
  }, [latticeWidth])

  /** 处理格子的点击事件，实现下棋逻辑 */
  const handleClick = function handleClick(i: number) {
    if (squares[i]) {
      return // 如果格子不为空，则不进行操作
    }
    const nextSquares = squares.slice() // 复制当前棋盘状态
    nextSquares[i] = nextFlag // 在点击位置放置棋子
    onPlay(nextSquares) // 触发回调，更新棋盘状态
  }

  /** 渲染棋盘，包括每个格子和点击事件 */
  return (
    <div className="board-container" style={{ width: totalWidth }}>
      {squares.map((val, i) => (
        <div
          key={i}
          className="square"
          style={squareStyle}
          onClick={() => handleClick(i)}
        >
          {val}
        </div>
      ))}
    </div>
  )
}

/** 导出Board组件供其他部分使用 */
export default Board
