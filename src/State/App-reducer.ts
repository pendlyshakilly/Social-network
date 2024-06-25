import {AppThunk} from "./Store";
import {GetUserDataAuth} from "./Auth-reducer";
import {getFriends} from "./Users-reducer";
import {Simulate} from "react-dom/test-utils";


export type AppInitialStateType = {
    initialized: boolean
    searchMode: boolean
    errors: string[]
}

const InitialState: AppInitialStateType = {
    initialized: false,
    searchMode: false,
    errors: []
}

const AppReducer = (state: AppInitialStateType = InitialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case INITIALIZED_TYPE:
            return {...state, initialized: true}
        case SET_SEARCH_MODE:
            return {...state, searchMode: action.status}
        case SET_ERROR_TYPE:
            return {...state, errors: [...state.errors, action.error]}
        case DELETE_ERROR_TYPE:
            return {...state, errors: state.errors.filter(el => el !== action.ErrorId)}
        default:
            return state
    }
};

const INITIALIZED_TYPE = 'INITIALIZED_TYPE' as const
const SET_SEARCH_MODE = 'SET_SEARCH_MODE' as const
const SET_ERROR_TYPE = 'SET_ERROR_TYPE' as const
const DELETE_ERROR_TYPE = 'DELETE_ERROR_TYPE' as const

type InitializedSuccessType = ReturnType<typeof InitializedSuccess>
type SetSearchModeType = ReturnType<typeof SetSearchMode>
type SetErrorType = ReturnType<typeof SetError>
type DeleteErrorType = ReturnType<typeof DeleteError>

type AppActionsType = InitializedSuccessType | SetSearchModeType
    | SetErrorType | DeleteErrorType

export const DeleteError = (ErrorId: string) => ({type: DELETE_ERROR_TYPE, ErrorId})
export const SetError = (error: string) => ({type: SET_ERROR_TYPE, error} as const)
export const SetSearchMode = (status: boolean) => ({type: SET_SEARCH_MODE, status} as const)
export const InitializedSuccess = () => ({type: INITIALIZED_TYPE} as const)
export const Initialized = (): AppThunk => (dispatch) => {
    Promise.all([dispatch(GetUserDataAuth())])
        .then(() => {
            dispatch(InitializedSuccess())
        })
        .catch(e => alert(e))

}

export default AppReducer;