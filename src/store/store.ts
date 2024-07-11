import { combineReducers } from 'redux';
import { gameReducer } from './modules/game/reducer';
import { historyReducer } from './modules/history/reducer';

/** 定义 rootReducer，使用 combineReducers 将 各个reducer 合并为一个总的 reducer */
export const rootReducer = combineReducers({ game: gameReducer, history: historyReducer });
