### 优化 1：
#### 对组件更高的抽象，提高组件的可复用可拓展性，理解数据驱动视图（配置对象列表）
#### 减少不必要的 div
#### 优化计算胜利者的逻辑，使其更具通用性
#### 减少不必要的 useMemo
#### 如果不符合条件直接返回，减少不必要的 if-else
#### 仔细测试代码，减少 bug
### 优化 2：
#### 减少不必要的数据派生操作，想清楚是否可以直接利用当前数据
old：
```tsx
/** 用于渲染的模式选择列表 */
const selectList = configList.map((config, index) => {
  return {
    name: config.name,
    configIndex: index,
  };
});

// selectList.map(({ name, configIndex }) => {
```
new：
```tsx
configList.map((config, index) => {
```
#### 当一个生成对象的函数参数太多，不如直接写对象：
old：
```tsx

/**
 * 创建游戏配置对象
 *
 * @param name 游戏名称
 * @param playerFlags 不同棋手的棋子样式，支持两个以上的多玩家
 * @param rowNum 棋盘的行数
 * @param colNum 棋盘的列数
 * @param successNeedNum 要求获胜时在一条线上的最少棋子数量
 * @returns 返回游戏配置对象
 */
const createGameConfig = function createGameConfig (name: GameConfig['name'], playerFlags:ChessProps['playerFlags'], rowNum:ChessProps['rowNum'], colNum:ChessProps['colNum'], successNeedNum:ChessProps['successNeedNum']): GameConfig {
    return {
        name,
        ChessProps: {
            playerFlags,
            rowNum,
            colNum,
            successNeedNum,
        },
    };
};

/**
 * 获取游戏配置列表
 */
export const getGameConfigList = function getGameConfigList (): GameConfig[] {
    return [
        createGameConfig('井字棋', ['❌', '🔘'], 3, 3,  3),
        createGameConfig('五子棋（15*15）', ['⚫', '⚪'], 15, 15,  5),
        createGameConfig('五子棋（15*25）', ['⚫', '⚪'], 15, 25,  5),
        createGameConfig('七子棋（3个玩家）', ['🟢', '🟣', '🔵'], 20, 20,  7),
    ];
};
```
new：
```tsx

/**
 * 获取游戏配置列表
 */
export const getGameConfigList = function getGameConfigList (): GameConfig[] {
    return [
        { name: '井字棋', ChessProps: { playerFlags: ['❌', '🔘'], rowNum: 3, colNum: 3, successNeedNum: 3 } },
        { name: '五子棋（15*15）', ChessProps: { playerFlags: ['⚫', '⚪'], rowNum: 15, colNum: 15, successNeedNum: 5 } },
        { name: '五子棋（15*25）', ChessProps: { playerFlags: ['⚫', '⚪'], rowNum: 15, colNum: 25, successNeedNum: 5 } },
        { name: '七子棋（3个玩家）', ChessProps: { playerFlags: ['🟢', '🟣', '🔵'], rowNum: 20, colNum: 20, successNeedNum: 7 } },
    ];
};

```
#### 将多属性的数据抽象为对象，并为对象提供唯一标识
```tsx
/**
 * 获取游戏配置列表
 */
export const getGameConfigList = function getGameConfigList (): GameConfig[] {
    return [
        { id: 1, name: '井字棋', ChessProps: { playerFlags: ['❌', '🔘'], rowNum: 3, colNum: 3, successNeedNum: 3 } },
        { id: 2, name: '五子棋（15*15）', ChessProps: { playerFlags: ['⚫', '⚪'], rowNum: 15, colNum: 15, successNeedNum: 5 } },
        { id: 3, name: '五子棋（15*25）', ChessProps: { playerFlags: ['⚫', '⚪'], rowNum: 15, colNum: 25, successNeedNum: 5 } },
        { id: 4, name: '七子棋（3个玩家）', ChessProps: { playerFlags: ['🟢', '🟣', '🔵'], rowNum: 20, colNum: 20, successNeedNum: 7 } },
    ];
};
```
```tsx
            {/* 游戏视图区域，根据模式显示不同的游戏组件 */}
            <div className='game-view'>
                {
                    configList.map((config) => {
                        return (currentModeId === config.id) && <Chess key={config.id} {...config.ChessProps} ></Chess>;
                    })
                }
            </div>
```
#### 将棋手和他使用的棋子抽象为一个对象，并给一个 ID
可能的例子：
```tsx
/** 玩家信息 */
export type PlayerInfo = {
    /** 棋子的样式 */
    flag: string;
    /** 玩家的名字 */
    name: string;
    /** 玩家的id */
    id: number;
}


/** 棋类组件的Props的类型 */
export type ChessProps = {
    /** 不同棋手的棋子样式，支持两个以上的多玩家 */
    playerFlags: PlayerInfo[];
    /** 棋盘的行数 */
    rowNum: number;
    /** 棋盘的列数 */
    colNum: number;
    /** 要求获胜时在一条线上的最少棋子数量 */
    successNeedNum: number;
}
```
#### 函数的声明方式，尽量使用箭头函数的形式，普通函数有动态 this 的问题，注意匿名函数对调试的影响？
old：
```tsx
/**
 * 获取游戏配置列表
 */
export const getGameConfigList = function getGameConfigList (): GameConfig[] {
    return [
        { id: 1, name: '井字棋', ChessProps: { playerFlags: ['❌', '🔘'], rowNum: 3, colNum: 3, successNeedNum: 3 } },
        { id: 2, name: '五子棋（15*15）', ChessProps: { playerFlags: ['⚫', '⚪'], rowNum: 15, colNum: 15, successNeedNum: 5 } },
        { id: 3, name: '五子棋（15*25）', ChessProps: { playerFlags: ['⚫', '⚪'], rowNum: 15, colNum: 25, successNeedNum: 5 } },
        { id: 4, name: '七子棋（3个玩家）', ChessProps: { playerFlags: ['🟢', '🟣', '🔵'], rowNum: 20, colNum: 20, successNeedNum: 7 } },
    ];
};

```
new：
```tsx
/**
 * 获取游戏配置列表
 */
export const getGameConfigList = (): GameConfig[] => {
    return [
        { id: 1, name: '井字棋', ChessProps: { playerFlags: ['❌', '🔘'], rowNum: 3, colNum: 3, successNeedNum: 3 } },
        { id: 2, name: '五子棋（15*15）', ChessProps: { playerFlags: ['⚫', '⚪'], rowNum: 15, colNum: 15, successNeedNum: 5 } },
        { id: 3, name: '五子棋（15*25）', ChessProps: { playerFlags: ['⚫', '⚪'], rowNum: 15, colNum: 25, successNeedNum: 5 } },
        { id: 4, name: '七子棋（3个玩家）', ChessProps: { playerFlags: ['🟢', '🟣', '🔵'], rowNum: 20, colNum: 20, successNeedNum: 7 } },
    ];
};

```
函数的 name：
```tsx
const myFn = () => {
  console.log('hello world')
}
// myFn
console.log(myFn.name)

const myFn2 = function () {
  console.log('hello world')
}
// myFn2
console.log(myFn2.name)

const myFn3 = function test() {
  console.log('hello world')
}
// test
console.log(myFn3.name)

```
#### 使用`.d.ts`文件声明类型，eslint 不检查？
```tsx
// src\components\Board\Board.type.ts
import { PosInfo } from '../../utils/index.type';

/** 棋盘二维列表，其中：字符串表示棋子，或null表示空 */
export type SquaresList = ((string | null)[])[]
```
```tsx
src\components\Board\test.d.ts
import { SquaresList } from './Board.type';
// 运行npm run lint 命令报错了
```
运行npm run lint 命令报错了：
```tsx
> tic-tac-toe@0.0.0 lint
> eslint . --fix --ext ts,tsx,cjs --report-unused-disable-directives --max-warnings 0


D:\Code\mycode\tic-tac-toe\src\components\Board\test.d.ts
  1:10  error  'SquaresList' is defined but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (1 error, 0 warnings)
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/34576819/1720614209317-3915c32b-1caf-44a2-9a6b-4364dddb9446.png#averageHue=%23f5f4f2&clientId=u9afbce02-ae85-4&from=paste&height=440&id=u3d7b49aa&originHeight=651&originWidth=354&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40295&status=done&style=none&taskId=u2ecb46e2-a0b0-487e-ace4-65ddf6daf7f&title=&width=239)
#### 减少 let 声明变量，之后赋值的情况
old：
```tsx
    /** 计算时间旅行的每一项元素 */
    const timeTravelItemList = useMemo(() => {
        return historyList.map((_history, index) => {
            let description;
            if (index > 0) {
                description = `回到状态 #${index}`;
            } else {
                description = '回到游戏开始';
            }
            return (
                <li key={index}>
                    <button onClick={() => handleTimeTrave(index)}>{description}</button>
                </li>
            );
        });
    }, [historyList]);
```
new：
```tsx
    /** 计算时间旅行的每一项元素 */
    const timeTravelItemList = useMemo(() => {
        return historyList.map((_history, index) => {
            const description = index > 0 ? `回到状态 #${index}` : '回到游戏开始';
            return (
                <li key={index}>
                    <button onClick={() => handleTimeTrave(index)}>{description}</button>
                </li>
            );
        });
    }, [historyList]);
```
old：
```tsx
  /**
     * 处理下棋的函数
     * @param {SquaresList} nextSquares - 更新后的棋盘状态
     */
    const handlePlay =  (nextSquares: SquaresList, posX:number, posY:number) => {
        if (currentHistory.gameOver) {
            window.confirm('游戏已经结束了！');
            return;
        }
        // 下完一棋后需要判断是否存在胜利者
        const calculateRes = calculateWinner(nextSquares, props.successNeedNum, posX, posY);
        let onLinePointPosList;
        let gameOver = false;
        if (calculateRes) {
            // 存在胜利者，游戏结束
            const { winner, onLinePointPosList: list } = calculateRes;
            onLinePointPosList = list;
            gameOver = true;
            window.confirm(`棋手${winner}胜利了！`);
        }
        /** 新的下一个棋手的棋子的索引 */
        const nextPlayerIndex = (currentHistory.nextPlayerIndex + 1) % props.playerFlags.length;
        /** 新的历史记录对象 */
        const newHistory:HistoryObj = { squares: nextSquares, nextPlayerIndex, onLinePointPosList, gameOver };
        // 将新的历史状态添加到历史列表
        const newHistoryList = [...historyList.slice(0, currentMove + 1), newHistory];
        setHistoryList(newHistoryList);
        // 更新棋盘记录的位置：更新currentMove后currentHistory会自动更新
        setCurrentMove(newHistoryList.length - 1);
    };
```
new：
```tsx
需要修改calculateWinner方法，使其返回的数据结构，类型一致，这样就不用再判断  if (calculateRes) {}，也不用声明
let onLinePointPosList;
let gameOver = false;
```
#### 函数返回的数据结构尽量一致
old：
```tsx
/**
 * 计算胜利者。
 * 检查在posY和posX位置的棋子周围的所有可能方向上是否有连续的successNeedNum个相同的棋子在同一直线上。
 * 这里我们主要关注四个方向：水平、垂直、正对角线和反对角线。
 *
 * @param squares 棋盘二维数组
 * @param successNeedNum 要求获胜时在一条线上的最少棋子数量
 * @param posX 棋子横坐标(列位置)
 * @param posY 棋子纵坐标(行位置)
 * @returns 获胜者的标记（字符串）和在同一条线上的点的坐标
 */
export const calculateWinner = (squares: SquaresList, successNeedNum: number, posX: number, posY: number) => {
    /** 保存有玩家胜利时，在同一条线上的点的坐标 */
    let onLinePointPosList:PosInfo[] = [];

  。。。
  
    // 检查所有方向：调用checkDirection四次，分别检查水平、垂直、正对角线和反对角线方向。
    if (checkDirection(1, 0) || checkDirection(0, 1) || checkDirection(1, 1) || checkDirection(-1, 1)) {
        return {
            winner: squares[posY][posX],
            onLinePointPosList,
        };
    }

    return null; // 如果没有获胜者
};
```
new：
```tsx
/**
 * 计算胜利者。
 * 检查在posY和posX位置的棋子周围的所有可能方向上是否有连续的successNeedNum个相同的棋子在同一直线上。
 * 这里我们主要关注四个方向：水平、垂直、正对角线和反对角线。
 *
 * @param squares 棋盘二维数组
 * @param successNeedNum 要求获胜时在一条线上的最少棋子数量
 * @param posX 棋子横坐标(列位置)
 * @param posY 棋子纵坐标(行位置)
 * @returns 获胜者的标记（字符串）和在同一条线上的点的坐标
 */
export const calculateWinner = (squares: SquaresList, successNeedNum: number, posX: number, posY: number) => {
    /** 保存有玩家胜利时，在同一条线上的点的坐标 */
    let onLinePointPosList:PosInfo[] = [];

  。。。
  
    // 检查所有方向：调用checkDirection四次，分别检查水平、垂直、正对角线和反对角线方向。
    if (checkDirection(1, 0) || checkDirection(0, 1) || checkDirection(1, 1) || checkDirection(-1, 1)) {
        return {
            winner: squares[posY][posX],
            onLinePointPosList,
        };
    }

    // 如果没有获胜者
    return {
        winner: null,
        onLinePointPosList: [],
    };
};
```
这样我们的`handlePlay`函数就不存在 let 声明变量，之后赋值的问题了：
```tsx
    /**
     * 处理下棋的函数
     * @param {SquaresList} nextSquares - 更新后的棋盘状态
     */
    const handlePlay =  (nextSquares: SquaresList, posX:number, posY:number) => {
        if (currentHistory.gameOver) {
            window.confirm('游戏已经结束了！');
            return;
        }
        // 下完一棋后需要判断是否存在胜利者
        const { winner, onLinePointPosList  } = calculateWinner(nextSquares, props.successNeedNum, posX, posY);
        if (winner) {
            // 存在胜利者，游戏结束
            window.confirm(`棋手${winner}胜利了！`);
        }
        /** 新的下一个棋手的棋子的索引 */
        const nextPlayerIndex = (currentHistory.nextPlayerIndex + 1) % props.playerFlags.length;
        /** 新的历史记录对象 */
        const newHistory:HistoryObj = { squares: nextSquares, nextPlayerIndex, onLinePointPosList, gameOver: winner !== null };
        // 将新的历史状态添加到历史列表
        const newHistoryList = [...historyList.slice(0, currentMove + 1), newHistory];
        setHistoryList(newHistoryList);
        // 更新棋盘记录的位置：更新currentMove后currentHistory会自动更新
        setCurrentMove(newHistoryList.length - 1);
    };
```

