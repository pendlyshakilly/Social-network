import {AppThunk} from "./Store";
import {GetUserDataAuth} from "./Auth-reducer";
import {getFriends} from "./Users-reducer";


type InitialStateType = {
    initialized: boolean
}

const InitialState: InitialStateType = {
    initialized: false
}

const AppReducer = (state = InitialState, action: { type: string }) => {
    switch (action.type) {
        case INITIALIZED_TYPE:
            return {...state, initialized: true}
        default:
            return state
    }
};

const INITIALIZED_TYPE = 'INITIALIZED_TYPE' as const
export const InitializedSuccess = () => ({type: INITIALIZED_TYPE})
export const Initialized = (): AppThunk => (dispatch) => {
    Promise.all([dispatch(GetUserDataAuth()), dispatch(getFriends())])
        .then(() => {
            dispatch(InitializedSuccess())
        })
        .catch(e => alert(e))

}

export default AppReducer;