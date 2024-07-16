## 闯关要求

### 第一关

下棋游戏
实现一个基本的井字棋游戏，要求如下：

1. 游戏可配置，可以切换为五子棋（5子），并且棋子样式要从"○"、"X"变为五子棋的黑白棋子
2. 记录每一步的执行，可以回退到任意一步
3. 合理拆分组件
4. 使用项目统一 Eslint 规则（npm 全局安装 ezeslint 包，然后在项目目录下直接执行 ezeslint ，选择对应选项即可），且提交的代码不允许出现 Lint 规则报错（含警告）或者 TS 检查报错
5. 使用 typescript，尽量不使用 any
6. 使用 hooks
7. 完成之后，代码上传到 github，仓库名为 tic-tac-toe, 分支名为 master
8. 提交完成后，点击按钮进入下一环节
9. 限制最长开发时间：2 天（越早提交越好哦~）

可参考 [https://react.dev/learn/tutorial-tic-tac-toe](https://react.dev/learn/tutorial-tic-tac-toe)
（样式等可以自由发挥，只要符合题目要求即可~）
注意：
代码规范满足 eslint 规则，其中有疑问的可以参考[这篇文档](https://aiyongtech.feishu.cn/wiki/WyYTwn5KTiTxHwk5WbzcrQacnXh)
代码提交规范需要遵循[这篇文档](https://aiyongtech.feishu.cn/wiki/IG4qwfJfYice2RkVH9GcZduHnxd)

### 第二关

? 恭喜你完成第一关的挑战~
感觉怎么样，是不是尽在掌握之中？那我们开始接下来的闯关吧
在第一关的练习中，我们完成了一个可变棋盘的小游戏，并且支持了井字棋和五子棋。接下来，我们要继续在这个基础上进行修改，具体要求如下：

1. 新建一个分支，使用 Class 组件重构当前应用。新建的分支名为 class。（其他要求保持不变）-看不到前面的流程了
2. 分别在 hooks 和 class 的实现方式中，使用 [react-redux](https://react-redux.js.org/)来管理数据。管理的数据可以包含所有数据，最低要求要包含"历史记录"的数据
3. 最晚2个工作日完成

### 第三关

厉害厉害，又闯过一关?
这次可没那么简单咯，请接招：
在现有的基础上，增加和玩家对抗的AI（仅实现井字棋即可），要求如下：

1. AI 如果先手，则需要尽可能赢，不能输
2. AI 如果后手，则需要保证不输 ，并且在可能的情况下赢
3. 在原本的 class 组件分支实现即可
4. 最长开发时间：2天

这次的题目是不是更有意思了？注意审清题意以及做好测试哦，防止提交的 AI 是个"智障"~

### 第四关

### 第五关

### 第六关

## 改进优化记录

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

> 可能存在的问题？在`.d.ts`文件中使用了一个外部的类型，但我们并没有引入该类型， eslint 不会报错提示：

在下面例子中，我们使用了未引入的`PlayerInfo`：

```tsx
// src\store\modules\game\actions.type.d.ts

export type GameConfig = {
    id: number;
    name: string;
    ChessProps: {
        playerInfoList: PlayerInfo[];
        rowNum: number;
        colNum: number;
        successNeedNum: number;
    };
};
```

![image.png](https://cdn.nlark.com/yuque/0/2024/png/34576819/1720663238626-b855e27c-4951-4c7d-b224-c0bfb3c78719.png#averageHue=%23fdfbfb&clientId=u9afbce02-ae85-4&from=paste&height=486&id=u1f27d28d&originHeight=486&originWidth=1266&originalType=binary&ratio=1&rotation=0&showTitle=false&size=61606&status=done&style=none&taskId=ud82a3cc3-d12c-4979-ac05-0a1e392115e&title=&width=1266)
从一个错误路径引入类型也不会报错：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/34576819/1720663677389-a09fcb21-c75d-490f-8340-25c56fff46e1.png#averageHue=%23fdfbfb&clientId=u9afbce02-ae85-4&from=paste&height=480&id=u90e8dea4&originHeight=480&originWidth=1106&originalType=binary&ratio=1&rotation=0&showTitle=false&size=61946&status=done&style=none&taskId=u59cb9ffb-0d33-4982-9ae0-41759d696b2&title=&width=1106)
使用`.ts`文件时，eslint 会提示：找不到名称“PlayerInfo”。ts(2304)
![image.png](https://cdn.nlark.com/yuque/0/2024/png/34576819/1720663367905-ca488d75-9207-460b-8e06-c3563e418ef6.png#averageHue=%23fbfafa&clientId=u9afbce02-ae85-4&from=paste&height=452&id=ubb35efc6&originHeight=452&originWidth=1217&originalType=binary&ratio=1&rotation=0&showTitle=false&size=62726&status=done&style=none&taskId=ua148303b-f625-4d91-bf94-61361c42dcf&title=&width=1217)

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

### 优化 3

#### 将设置 redux 状态提取为一个函数，而不是通过 props 传递 dispatch 函数

old：

```tsx
import  { PureComponent } from 'react';
import './Game.scss';
import Chess from '../Chess/Chess';
import { getGameConfigListAPI } from '../../apis/game';
import { RootState,  } from '../../store';
import { setGameConfigList, setCurrentConfigId } from '../../store/modules/game/actions';
import { connect } from 'react-redux';


/** 映射状态到Game组件的props */
const mapStateToProps = (state:RootState) => {
    return {
        configList: state.game.gameConfigList,
        currentConfigId: state.game.currentConfigId,
    };
};

/** 映射dispatch到Game组件的props */
/** 包含 action creater 函数的一个对象，映射到组件props并调用时会自动dispatch，如：dispatch(setGameConfigList())  */
const mapDispatchToProps = {
    setGameConfigList,
    setCurrentConfigId,
};

type GameProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;


/** 游戏组件定义 */
class Game extends PureComponent<GameProps> {
    /** 组件挂载后，获取游戏配置列表 */
    componentDidMount () {
        getGameConfigListAPI().then((configList) => {
            this.props.setGameConfigList(configList);
            this.props.setCurrentConfigId(configList[0].id);
        });
    }

    render () {
      。。。
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Game);

```

new：
抽离为如下方法：

```tsx
// src\store\modules\game\utils.ts
import { store } from '../..';
import { setCurrentConfigId, setGameConfigList } from './actions';
import { GameConfig, GameConfigId } from './reducer.type';

/**
 * 设置当前使用的游戏配置id(即当前的棋类游戏)
 * @param configId 配置id
 */
export const setCurrentConfigIdUtil = (configId:GameConfigId) => {
    store.dispatch(setCurrentConfigId(configId));
};

/**
 * 设置游戏的配置列表
 * @param gameConfigList 配置列表
 */
export const setGameConfigListUtil = (gameConfigList: GameConfig[]) => {
    store.dispatch(setGameConfigList(gameConfigList));
};

```

使用：

```tsx
import  { PureComponent } from 'react';
import './Game.scss';
import Chess from '../Chess/Chess';
import { getGameConfigListAPI } from '../../apis/game';
import { RootState,  } from '../../store';
import { connect } from 'react-redux';
import { setCurrentConfigIdUtil, setGameConfigListUtil } from '../../store/modules/game/utils';


/** 映射状态到Game组件的props */
const mapStateToProps = (state:RootState) => {
    return {
        configList: state.game.gameConfigList,
        currentConfigId: state.game.currentConfigId,
    };
};

type GameProps = ReturnType<typeof mapStateToProps>;

/** 游戏组件定义 */
class Game extends PureComponent<GameProps> {
    /** 组件挂载后，获取游戏配置列表 */
    componentDidMount () {
        getGameConfigListAPI().then((configList) => {
            setGameConfigListUtil(configList);
            setCurrentConfigIdUtil(configList[0].id);
        });
    }

    render () {
        。。。
    }
}


export default connect(mapStateToProps)(Game);

```

#### 不要直接修改 state

old：

```tsx
import { GameConfigId } from '../game/reducer.type';
import { HistoryAction, HistoryActionTypesEnum } from './action.type';
import { HistoryInfo, HistoryState } from './reducer.type';

export const initState: HistoryState = new Map<GameConfigId, HistoryInfo>();

export const historyReducer = (state: HistoryState = initState, action: HistoryAction): HistoryState => {
    switch (action.type) {
        case HistoryActionTypesEnum.SET_HISTORY_LIST:
            if (state.get(action.configId) !== undefined) {
                state.set(action.configId, { ...state.get(action.configId)!, historyList: action.payload });
            } else {
                state.set(action.configId, { historyList: action.payload, currentHistoryIndex: 0 });
            }
            return new Map(state);
        case HistoryActionTypesEnum.SET_CURRENT_HISTORY_INDEX:
            if (state.get(action.configId) !== undefined) {
                state.set(action.configId, { ...state.get(action.configId)!, currentHistoryIndex: action.payload });
            }
            return new Map(state);
        case HistoryActionTypesEnum.RESET_HISTORY:
            state.delete(action.configId);
            return new Map(state);
        default:
            return state;
    }
};

```

new：

```tsx
import { GameConfigId } from '../game/reducer.type';
import { HistoryAction, HistoryActionTypesEnum } from './action.type';
import { HistoryInfo, HistoryState } from './reducer.type';

export const initState: HistoryState = new Map<GameConfigId, HistoryInfo>();

export const historyReducer = (state: HistoryState = initState, action: HistoryAction): HistoryState => {
    const newMap = new Map(state);
    const historyInfo = newMap.get(action.configId);
    switch (action.type) {
        case HistoryActionTypesEnum.SET_HISTORY_LIST:
            if (historyInfo) {
                newMap.set(action.configId, { ...historyInfo, historyList: action.payload });
            } else {
                newMap.set(action.configId, { historyList: action.payload, currentHistoryIndex: 0 });
            }
            return newMap;
        case HistoryActionTypesEnum.SET_CURRENT_HISTORY_INDEX:
            if (historyInfo) {
                newMap.set(action.configId, { ...historyInfo, currentHistoryIndex: action.payload });
            }
            return newMap;
        case HistoryActionTypesEnum.RESET_HISTORY:
            newMap.delete(action.configId);
            return newMap;
        default:
            return state;
    }
};

```

#### 使用 await - async

old：

```tsx

    /** 组件挂载后，获取游戏配置列表 */
    componentDidMount () {
        getGameConfigListAPI().then((configList) => {
            setGameConfigListUtil(configList);
            setCurrentConfigIdUtil(configList[0].id);
        });
    }
```

new：

```tsx
    /** 组件挂载后，获取游戏配置列表 */
    async componentDidMount () {
        const configList = await getGameConfigListAPI();
        setGameConfigListUtil(configList);
        setCurrentConfigIdUtil(configList[0].id);
    }
```

### 优化 4

#### 解决 bug

在组件更新后调用`aIPlaysChess`进行 AI 下棋并使用`setTimeout`延迟下棋操作会造成 bug：如果在 setimeout 的回调函数等待触发期间进行时间回溯，可能会在时间回溯后的空位置下棋。
解决：添加`isAIplaying`标记，为`true`表示 AI 正在下棋，不能进行时间回溯。

```tsx
    /**
     * AI下棋
     * @param currentHistory 当前最新的棋盘记录，例如玩家下完棋后调用该方法时需要传入最新的棋盘记录（例如包含最新的棋盘二维列表squares），AI才能根据最新的棋盘记录进行正确下棋
     * @returns
     */
    handleAIPlay = (currentHistory: HistoryObj) => {
        if (!this.props.isAIMode) return;
        const { playerInfoList, successNeedNum } = this.props;
        const player = playerInfoList[currentHistory.nextPlayerIndex];
        if (!player.isAI) return;

        // 调用计算下棋位置的方法获取位置，并下棋
        const opponentPlayer = playerInfoList[getPlayerIndex(playerInfoList, false)];
        const { posY, posX } = calculateNextMove(currentHistory.squares, player.flag, opponentPlayer.flag, successNeedNum);
        if (posY < 0 || posX < 0) return; // 棋盘已满
        this.isAIplaying = true; // 设置AI正在下棋中，不能进行时间回溯
        setTimeout(() => {
            this.handlePlay({ posY, posX });
            this.isAIplaying = false; // AI下棋完成
        }, 300);
    };
```

#### 不应该在组件更新后调用 AI 下棋

old：

```tsx
    /** 组件更新 */
    componentDidUpdate (): void {
        // 如果是AI模式且下一位棋手是AI，则需要AI下棋
        this.aIPlaysChess();
    }
```

new：
在玩家下棋后再进行 AI 下棋。

```tsx
    /**
     * 处理玩家点击下棋的函数
     * @param pos 当前棋子的位置
     * @returns
     */
    handlePlayerPlay = (pos: PosInfo) => {
        const { playerInfoList } = this.props;
        const { currentHistory } = this.state;
        const player = playerInfoList[currentHistory.nextPlayerIndex];
        if (player.isAI) return; // 如果当前是AI下棋，则不允许玩家进行下棋操作
        // 玩家下棋
        const newHistory = this.handlePlay(pos);
        // 当玩家下棋后需要AI继续下棋，AI下棋后不会调用该方法（保证不会发生死循环）
        if (newHistory && newHistory.status === 'playing') this.handleAIPlay(newHistory);
    };
```

#### 获取空位位置的逻辑提取为函数

old：

```tsx
// 遍历棋盘上的每一个空位
for (let row = 0; row < rowMax; row++) {
    for (let col = 0; col < colMax; col++) {
        if (!squares[row][col]) {
            squares[row][col] = flag; // 尝试在该空位上放置当前玩家的棋子
            // 递归调用minimax，切换玩家角色（因为到对手玩家下棋了）
            best = Math.max(best, minimax(squares, false, flag, opponentFlag, successNeedNum, { posY: row, posX: col }));
            squares[row][col] = null; // 回退，把该位置上的棋子恢复为空
        }
    }
}
```

new：

```tsx

/**
 * 获取棋盘中的空位
 * @param squares 棋盘二维列表
 */
const getEmptyPos = (squares: SquaresList): PosInfo[] => {
    const list: PosInfo[] = [];
    const rowMax = squares.length; // 棋盘的行数
    const colMax = squares[0].length; // 棋盘的列数
    for (let row = 0; row < rowMax; row++) {
        for (let col = 0; col < colMax; col++) {
            if (!squares[row][col]) {
                list.push({ posY: row, posX: col });
            }
        }
    }
    return list;
};

```

#### 优化棋盘格子的渲染：提取为组件并进行缓存优化

old：

```tsx
    render () {
        const { latticeWidth, squares, onLinePointPosList } = this.props;
        return (
            <div className="board-container">
                {/* 遍历二维列表，渲染每个格子 */}
                {squares.map((list, row) => {
                    return (<div key={row} className='board-row'>
                        {list.map(((value, col) => (<div
                            // 为胜利时在一条线上的点添加高亮样式
                            className={classNames('square', { 'active-square': onLinePointPosList.some(pos => pos.posY === row && pos.posX === col) })}
                            style={{ width: latticeWidth, height: latticeWidth }  }
                            onClick={() => this.props.onPlay(row, col)}
                            key={col}
                        >
                            {value}
                        </div>)))}
                    </div>);
                })}
            </div>
        );
    }
```

new：
`Checkerboard`组件使用`PureComponent`进行 state 和 props 的浅比较，注意传入`Checkerboard`组件的 props 如果是引用类型则需要进行缓存。

```tsx
    render () {
        const { squares, onLinePointPosList } = this.props;
        return (
            <div className="board-container">
                {/* 遍历二维列表，渲染每个格子 */}
                {squares.map((list, row) => {
                    return (<div key={row} className='board-row'>
                        {list.map(((value, col) => (<Checkerboard
                            key={col}
                            isActive={onLinePointPosList.some(pos => pos.posY === row && pos.posX === col)}
                            posY={row}
                            posX={col}
                            flag={value}
                            onClickCheckerboard={ this.handleClickCheckerboard }
                        ></Checkerboard>)))}
                    </div>);
                })}
            </div>
        );
    }
```

## 要点实现记录

### 计算棋局的胜利者

```tsx
/** 一个点的位置记录，posY：纵坐标（行），posX：横坐标（列） */
export type PosInfo = {posY:number, posX:number}
/** 棋盘二维列表，其中：字符串表示棋子，或null表示空 */
export type SquaresList = ((string | null)[])[]
```

```tsx
import { SquaresList } from '../components/Board/Board.type';
import { PosInfo } from './index.type';

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
    /**
     * 这个函数会检查在给定的方向上是否有连续的successNeedNum个相同棋子。
     * @param dx 在x轴上的移动步长
     * @param dy 在y轴上的移动步长
     * @returns
     */
    const checkDirection = (dx: number, dy: number) => {
        let currentCount = 1; // 当前连续的棋子数量
        onLinePointPosList.push({ posY, posX });

        // 向前检查
        /** 移动后的横坐标 */
        let newX = posX + dx;
        /** 移动后的纵坐标 */
        let newY = posY + dy;
        while (newX >= 0 && newX < squares[0].length && newY >= 0 && newY < squares.length) { // 确保在棋盘内
            // 棋子相同
            if (squares[newY][newX] === squares[posY][posX]) {
                onLinePointPosList.push({ posY: newY, posX: newX });
                newX += dx;
                newY += dy;
                currentCount++;
            } else {
                // 棋子不连续了，直接结束
                break;
            }
        }

        // 向后检查
        newX = posX - dx;
        newY = posY - dy;
        while (newX >= 0 && newX < squares[0].length && newY >= 0 && newY < squares.length) {
            if (squares[newY][newX] === squares[posY][posX]) {
                onLinePointPosList.push({ posY: newY, posX: newX });
                newX -= dx;
                newY -= dy;
                currentCount++;
            } else {
                break;
            }
        }

        if (currentCount >= successNeedNum) {
            return true;
        }
        onLinePointPosList = [];
        return false;
    };

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

### 井字棋实现 AI 下棋

在3*3的二维数组实现的井字棋游戏中，增加和玩家对抗的AI（仅实现井字棋即可），要求如下：

1. AI 如果先手，则需要尽可能赢，不能输
2. AI 如果后手，则需要保证不输 ，并且在可能的情况下赢

#### 井字棋须知

井字棋须知：

- 如果都是井字棋高手，都遵循最优下棋策略，那么：
- 井字棋先手，中间格子一般是最佳落子位置，最优是赢，最差是平局，不可能输。
- 井字棋后手，最优是平局，最差是输，不可能赢。
- 都是高手的话，一般都是平局。

#### 下棋过程模拟

##### 玩家先手，AI 后手

```tsx
// 1. 玩家"O"是先手
/**
[
    [null, null, null],
    [null, 'O', null],
    [null, null, null],
]
 */

// 2. AI"X"
/**
[
    ['X', null, null],
    [null, 'O', null],
    [null, null, null],
]
 */

// 3. 玩家"O"
/**
[
    ['X', null, null],
    [null, 'O', 'O'],
    [null, null, null],
]
 */

// 4. AI"X"
/**
[
    ['X', null, null],
    ['X', 'O', 'O'],
    [null, 'X', null],
]
 */

// 5. 玩家"O"
/**
[
    ['X', null, null],
    ['X', 'O', 'O'],
    ['O', null, null],
]
 */

// 6. AI"X"
/**
[
    ['X', null, 'X'],
    ['X', 'O', 'O'],
    ['O', null, null],
]
 */

// 7. 玩家"O"
/**
[
    ['X', 'O', 'X'],
    ['X', 'O', 'O'],
    ['O', null, null],
]
 */

// 8. AI"X"
/**
[
    ['X', 'O', 'X'],
    ['X', 'O', 'O'],
    ['O', 'X', null],
]
 */

// 9. 玩家"O"
/**
[
    ['X', 'O', 'X'],
    ['X', 'O', 'O'],
    ['O', 'X', 'O'],
]
 */
```

##### AI先手， 玩家后手

```tsx
// 1. AI"X"是先手
/**
[
    ['X', null, null],
    [null, null, null],
    [null, null, null],
]
 */

// 2. 玩家"O"
/**
[
    ['X', null, null],
    [null, 'O', null],
    [null, null, null],
]
 */

// 3. AI"X"
/**
[
    ['X', 'X', null],
    [null, 'O', null],
    [null, null, null],
]
 */

// 4. 玩家"O"
/**
[
    ['X', 'X', 'O'],
    [null, 'O', null],
    [null, null, null],
]
 */

// 5. AI"X"
/**
[
    ['X', 'X', 'O'],
    [null, 'O', null],
    ['X', null, null],
]
 */

// 6. 玩家"O"
/**
[
    ['X', 'X', 'O'],
    ['O', 'O', null],
    ['X', null, null],
]
 */

// 7. AI"X"
/**
[
    ['X', 'X', 'O'],
    ['O', 'O', 'X'],
    ['X', null, null],
]
 */

// 8. 玩家"O"
/**
[
    ['X', 'X', 'O'],
    ['O', 'O', 'X'],
    ['X', 'O', null],
]
 */

// 9. AI"X"
/**
[
    ['X', 'X', 'O'],
    ['O', 'O', 'X'],
    ['X', 'O', 'X'],
]
 */
```

#### 求解最优下棋位置的算法：极小化极大算法（Minimax Algorithm）

##### 大致骨架

```tsx

/** 棋盘二维列表，其中：字符串表示棋子，或null表示空 */
type SquaresList = ((string | null)[])[]

/** 一个点的位置记录，posY：纵坐标（行），posX：横坐标（列） */
export type PosInfo = {posY:number, posX:number}

/**
 * 给出一个棋盘状态的二维列表和一个棋子标记，返回最佳的下棋位置
 * @param squares 棋盘二维列表（只支持棋盘大小为3*3）
 * @param flag 希望尽可能获胜的棋子标记
 * @returns 最佳的该棋子下棋的位置
 */
function calculateNextMove(squares: SquaresList, flag: string): PosInfo {

}

// 1. 玩家"O"是先手
const squares = [
    [null, null, null],
    [null, 'O', null],
    [null, null, null],
]

// 2. AI"X" 调用 calculateNextMove 方法计算最优的下一步棋的位置
const res = calculateNextMove(squares, 'X');
```

##### 算法思路

为了实现`calculateNextMove`函数，可以使用极小化极大算法（Minimax Algorithm），这是一种经典的递归算法，用于两人游戏（如井字棋）中计算最佳移动。该算法通过递归计算每一个可能的移动，评估局面，然后选择最优策略。
以下是实现步骤：

1. **终局判断函数**`** checkWinner  **`：判断当前棋局是否有胜者或平局。
2. **计算得分函数**`** evaluate  **`：如果某方胜利，则返回一个分数。
3. **极大极小递归函数**`** minimax  **`：递归评估所有可能的移动，选择最优移动。
4. **主函数**`** calculateNextMove  **`：为棋盘上的每一个空位调用`**minimax**`递归函数，并返回最佳移动的位置。

##### 算法实现

```tsx

/** 棋盘二维列表，其中：字符串表示棋子，或null表示空 */
type SquaresList = ((string | null)[])[]

/** 一个点的位置记录，posY：纵坐标（行），posX：横坐标（列） */
export type PosInfo = { posY: number, posX: number }

/**
 * 检查棋盘是否有胜者
 * @param squares 棋盘二维列表
 * @returns 如果有胜者则返回胜者的棋子标记，否则返回null
 */
function checkWinner(squares: SquaresList): string | null {
    const lines = [
        [[0, 0], [0, 1], [0, 2]],// 第一行
        [[1, 0], [1, 1], [1, 2]],// 第二行
        [[2, 0], [2, 1], [2, 2]],// 第三行
        [[0, 0], [1, 0], [2, 0]],// 第一列
        [[0, 1], [1, 1], [2, 1]],// 第二列
        [[0, 2], [1, 2], [2, 2]],// 第三列
        [[0, 0], [1, 1], [2, 2]],// 对角线
        [[0, 2], [1, 1], [2, 0]],// 对角线
    ];
    // 检查所有可能连成一条线的位置组，是否连成了一条线
    for (let i = 0; i < lines.length; i++) {
        const [[a, b], [c, d], [e, f]] = lines[i];
        if (squares[a][b] && squares[a][b] === squares[c][d] && squares[a][b] === squares[e][f]) {
            return squares[a][b];
        }
    }
    return null;
}

/**
 * 评估当前棋盘状态的得分
 * @param squares 棋盘二维列表
 * @param flag 希望尽可能获胜的棋子标记
 * @returns 如果当前棋子胜利返回10分，对方胜利返回-10分，平局返回0分
 */
function evaluate(squares: SquaresList, flag: string): number {
    const winner = checkWinner(squares);
    if (winner === flag) {
        return 10;
    } else if (winner && winner !== flag) {
        return -10;
    }
    return 0;
}

/**
 * 极大极小算法递归函数
 * @param squares 棋盘二维列表
 * @param depth 当前递归深度
 * @param isMaximizing 是否为极大化方
 * @param flag 当前棋子标记
 * @param opponentFlag 对方棋子标记
 * @returns 当前棋盘状态的最佳得分
 */
function minimax(squares: SquaresList, depth: number, isMaximizing: boolean, flag: string, opponentFlag: string): number {
    // 评估上次放置棋子的位置的分数
    const score = evaluate(squares, flag);
    if (score === 10 || score === -10) {
        return score;
    }

    // 棋盘已经满了，不需要再遍历棋盘空位下棋了，否则继续遍历棋盘空位进行下棋，直到：有玩家获胜或者棋盘满了
    if (squares.flat().every(cell => cell)) {
        return 0;
    }

    if (isMaximizing) {
        let best = -Infinity;
        // 遍历棋盘上的每一个空位
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!squares[i][j]) {
                    squares[i][j] = flag; // 尝试在该空位上放置当前玩家的棋子
                    // 递归调用minimax，切换玩家角色（因为到对手玩家下棋了）
                    best = Math.max(best, minimax(squares, depth + 1, false, flag, opponentFlag));
                    squares[i][j] = null; // 回退
                }
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!squares[i][j]) {
                    squares[i][j] = opponentFlag; // 尝试在该空位上放置对手玩家的棋子
                    best = Math.min(best, minimax(squares, depth + 1, true, flag, opponentFlag));
                    squares[i][j] = null;
                }
            }
        }
        return best;
    }
}

/**
 * 计算最佳下棋位置
 * @param squares 棋盘二维列表
 * @param flag 希望尽可能获胜的棋子标记（当前需要下棋的棋子标记）
 * @returns 最佳的该棋子下棋的位置
 */
function calculateNextMove(squares: SquaresList, flag: string): PosInfo {
    squares = JSON.parse(JSON.stringify(squares))
    let bestVal = -Infinity;
    let bestMove: PosInfo = { posY: -1, posX: -1 };
    const opponentFlag = flag === 'X' ? 'O' : 'X';
    // 遍历棋盘上的每一个空位
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!squares[i][j]) {
                squares[i][j] = flag; // 尝试在该空位上放置当前玩家的棋子
                let moveVal = minimax(squares, 0, false, flag, opponentFlag);
                squares[i][j] = null; // 回退，把该位置上的棋子恢复为空
                // 如果当前位置的分数大于最佳分数，则更新最佳分数和最佳走法位置
                // 因为是当前玩家（flag）希望尽可能获胜，而在评估函数中，当前玩家获胜是+10分，所以分数越大越好
                if (moveVal > bestVal) {
                    bestMove = { posY: i, posX: j };
                    bestVal = moveVal;
                }
            }
        }
    }

    return bestMove;
}


// 1. 玩家"O"是先手
const squares = [
    [null, null, null],
    [null, 'O', null],
    [null, null, null],
]

// 2. AI"X" 调用 calculateNextMove 方法计算最优的下一步棋的位置
const res = calculateNextMove(squares, 'X');
console.log(res);
// { posY: 0, posX: 0 }

```

##### 图解算法

```tsx

// 1. AI"O"是先手
// 省略。。。
// 6. 玩家"X"
/**
[
    ['O', 'X', 'O'],
    ['X', null, null],
    ['X', 'O', null],
]
 */

const squares = [
    ['O', 'X', 'O'],
    ['X', null, null],
    ['X', 'O', null],
]

// 7. AI"O" 调用 calculateNextMove 方法计算最优的下一步棋的位置
const res = calculateNextMove(squares, 'O');
console.log(res);

```

![image.png](https://cdn.nlark.com/yuque/0/2024/png/34576819/1720868819659-e7e7926b-3a0f-4e3d-99b0-07ddc42c9a2a.png#averageHue=%23ecebeb&clientId=ube135a04-c821-4&from=paste&id=eJxE8&originHeight=1388&originWidth=2016&originalType=url&ratio=1&rotation=0&showTitle=false&size=253387&status=done&style=none&taskId=u12b79dc0-4fd8-418a-847b-3c92599f300&title=)
![](https://cdn.nlark.com/yuque/0/2024/jpeg/34576819/1720881483376-1520fa23-4673-49b6-aa70-f69da73b532b.jpeg)

##### 复杂度分析

极大极小算法的时间复杂度分析主要取决于递归调用的次数和每次调用中所进行的操作。对于一个3x3的井字棋（Tic-Tac-Toe）游戏，时间复杂度如下：

1. **递归树的深度**：对于一个3x3的井字棋，最多有9个空位，因此递归树的最大深度为9。
2. **每层递归的分支数量**：在最坏的情况下，每个空位都可能是一个有效的移动。因此，对于每一层，可能有最多9个、8个、7个……直到1个可能的分支。

综合考虑，这形成了一个递归树，其节点数大致是9!（即9的阶乘），因为每一层的分支数量分别是9、8、7……1。
因此，极大极小算法在井字棋中的最坏时间复杂度为O(9!)。
为了更直观地理解，让我们简化一些：

- 第一层有9个选择。
- 第二层有8个选择。
- 第三层有7个选择。
- …

这意味着总的节点数是：
$9 \times 8 \times 7 \times ... \times 1 = 9! = 362,880$
虽然这个数目看起来很大，但对于现代计算机来说，这个量级是可以处理的。实际上，由于井字棋的简单性和有限的局面，许多分支在较早的阶段就会被剪枝（使用α-β剪枝技术），实际运行时间会更短。

#### 参考

[Minimax博弈算法设计井字棋AI(Golang) - RedJACK~ - 博客园](https://www.cnblogs.com/jackonessalad/articles/16358473.html)
[– 思源博客](https://www.siyuanblog.cn/archives/minmax)
[精通井字棋：策略、规则和说明](https://tictactoefree.com/zh/guize)
[在线玩井字棋。1人或2人的游戏。](https://tictactoefree.com/zh/)
