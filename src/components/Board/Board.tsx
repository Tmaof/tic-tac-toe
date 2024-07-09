import React, { useMemo } from 'react'
import './Board.scss'

type BoardProps = {
  // 每个格子的宽度
  latticeWidth?: number
  // 每一行格子的数量
  numberOfEachRow?: number
  // 所有格子的一个列表
  squares: (string | null)[]
}

const Board: React.FC<BoardProps> = (props) => {
  const { latticeWidth = 50, numberOfEachRow = 3, squares } = props
  // 计算外层棋盘的总宽度
  const totalWidth = useMemo(() => {
    return latticeWidth * numberOfEachRow + 'px'
  }, [latticeWidth, numberOfEachRow])
  // 每个格子的宽高
  const squareStyle = useMemo<React.CSSProperties>(() => {
    return {
      width: latticeWidth + 'px',
      height: latticeWidth + 'px'
    }
  }, [latticeWidth])

  return (
    <div className="board-container" style={{ width: totalWidth }}>
      {squares.map((val, i) => (
        <div key={i} className="square" style={squareStyle}>
          {val}
        </div>
      ))}
    </div>
  )
}

export default Board
