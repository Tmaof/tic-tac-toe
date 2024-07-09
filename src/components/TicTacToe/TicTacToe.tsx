import Board from '../Board/Board'
// 测试用的初始数据列表
const initSqu = ['O', null, 'X', 'X', 'X', 'O', 'O', null, null]

const TicTacToe: React.FC = () => {
  return (
    <div>
      <Board squares={initSqu}></Board>
    </div>
  )
}

export default TicTacToe
