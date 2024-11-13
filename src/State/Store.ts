import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux';
import ProfileReducer from "./Profile-reducer";
import AuthReducer from "./Auth-reducer";
import {thunk, ThunkAction, ThunkDispatch, ThunkMiddleware} from 'redux-thunk'
import AppReducer from "./App-reducer";
import UserReducer from "./Users-reducer";
import {composeWithDevTools} from "@redux-devtools/extension";


type ReducerType = typeof rootReducers
export type AppStateType = ReturnType<ReducerType>

const rootReducers = combineReducers({
    profilePage: ProfileReducer,
    userPage: UserReducer,
    auth: AuthReducer,
    initialized: AppReducer
})

const store = legacy_createStore<any, any>(rootReducers, composeWithDevTools(applyMiddleware(thunk)))

export type AppRootStateType = ReturnType<typeof rootReducers>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type AppThunk<ReturnType = Promise<any> | void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>


// @ts-ignore
window.__store__ = store

export default store