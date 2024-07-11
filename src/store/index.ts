import { legacy_createStore } from 'redux';
import { rootReducer } from './store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/**
 * 创建 Redux store 实例，使用 rootReducer 作为其 reducer 函数
 * 这个 store 将管理应用程序的所有状态
 */
export const store = legacy_createStore(rootReducer);

/** 表示整个应用程序状态树的类型 */
export type RootState = ReturnType<typeof store.getState>;

/** 表示应用程序的 dispatch 函数的类型 */
export type AppDispatch = typeof store.dispatch;

/**
 * 定义 useAppSelector 钩子，它使用 useSelector 钩子来提供对 Redux store state 的访问
 * 并使用 TypedUseSelectorHook 使其能够接受 RootState 类型
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * 定义 useAppDispatch 钩子，它使用 useDispatch 钩子来提供对 Redux store 的 dispatch 函数的访问
 * 限制其返回为 AppDispatch 类型
 */
export const useAppDispatch : () => AppDispatch = useDispatch;
