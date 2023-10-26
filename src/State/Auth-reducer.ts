import {Dispatch} from "redux";
import {AppThunk} from "./Store";
import {AuthAPI} from "../Dal/API";

const SET_USER_DATA = 'SET_USER_DATA'

export const SetUserDataAuthSuccess = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}} as const)



export const GetUserDataAuth = (): AppThunk => async (dispatch) => {
    const data = await AuthAPI.authMe()
    if (data.resultCode === 0) {
        let {id, email, login} = data.data
        dispatch(SetUserDataAuthSuccess(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    const data = await AuthAPI.login(email, password, rememberMe)
    if (data.resultCode === 0) {
        dispatch(GetUserDataAuth())

    }
}
export const logout = (): AppThunk => (dispatch: Dispatch) => {
    AuthAPI.logout().then(data => {
            if (data.resultCode === 0) {
                dispatch(SetUserDataAuthSuccess(null, null, null, false))
            }
        }
    )
}

export type SetUserDataAuthSuccessType = ReturnType<typeof SetUserDataAuthSuccess>
export type AuthActionsType = SetUserDataAuthSuccessType
export type AuthInitialType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

let initialState: AuthInitialType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const AuthReducer = (state = initialState, action: AuthActionsType) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state;
    }

};

export default AuthReducer;