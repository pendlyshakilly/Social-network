import {UsersAPI} from "../Dal/API";
import {AppThunk} from "./Store";
import {setUserFollow} from "./Profile-reducer";


export const FollowSuccess = (userId: number, status: boolean) => ({type: FOLLOWED_TYPE, userId, status} as const)
export const SetUser = (users: UserType[]) => ({type: SET_USER_TYPE, users} as const)
export const SetCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const SetTotalCount = (total_Count: number) => ({type: SET_TOTAL_COUNT, total_Count} as const)
export const ToggleLoader = (isFetching: boolean) => ({type: TOGGLE_LOADER, isFetching} as const)
const setFriends = (friends: UserType[]) => ({type: SET_FRIENDS, friends})

export const SetDisable = (disable: boolean, userId: number) => ({type: SET_DISABLE, disable, userId} as const)

export const GetUsers = (currentPage: number, pageSize: number): AppThunk => (dispatch) => {
    dispatch(ToggleLoader(true))
    UsersAPI.getUser(currentPage, pageSize).then(data => {
        dispatch(ToggleLoader(false))
        dispatch(SetUser(data.items))
        dispatch(SetTotalCount(data.totalCount))
        dispatch(SetCurrentPage(currentPage))
    })


}
const FollowUnFollowUtil = async (dispatch: any, apiMethod: any, id: number, status: boolean) => {
    dispatch(SetDisable(true, id))
    let response = await apiMethod(id)
    if (response === 0) {
        dispatch(setUserFollow(status))
        dispatch(FollowSuccess(id, status))
        dispatch(SetDisable(false, id))
    }
}
export const Follow = (id: number, status: boolean): AppThunk => (dispatch) => {
    if (status) {
        FollowUnFollowUtil(dispatch, UsersAPI.follow.bind(UsersAPI), id, status).catch(error => alert(error))
    } else {
        FollowUnFollowUtil(dispatch, UsersAPI.unFollow.bind(UsersAPI), id, status).catch(error => alert(error))
    }
}
export const getFriends = (): AppThunk => (dispatch) => {
    dispatch(ToggleLoader(true))
    UsersAPI.getFriends().then(data => {
        dispatch(setFriends(data.items))
    })
}

export type UserPageType = {
    users: UserType[],
    pageSize: number,
    TotalCount: number,
    currentPage: number,
    isFetching: boolean,
    disabledMode: [],
    friends: UserType[],
}

const UserReducer = (state: UserPageType = initialState, action: UsersActionType) => {
    switch (action.type) {
        case FOLLOWED_TYPE:
            return {
                ...state,
                users: state.users.map(el => el.id === action.userId ? {...el, followed: action.status} : el),
                friends: state.friends.filter(el => el.id !== action.userId)
            }
        case SET_USER_TYPE:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_COUNT:
            return {
                ...state, TotalCount: action.total_Count
            }
        case TOGGLE_LOADER:
            return {
                ...state, isFetching: action.isFetching
            }
        case SET_DISABLE:
            return {
                ...state,
                disabledMode: action.disable
                    ? [...state.disabledMode, action.userId]
                    : state.disabledMode.filter(id => id !== action.userId)
            }
        case SET_FRIENDS:
            return {
                ...state,
                friends: action.friends
            }
    }

    return state
}
type FollowSuccess = ReturnType<typeof FollowSuccess>
type SetUser = ReturnType<typeof SetUser>
type SetCurrentPage = ReturnType<typeof SetCurrentPage>
type SetTotalCount = ReturnType<typeof SetTotalCount>
type ToggleLoader = ReturnType<typeof ToggleLoader>
type SetDisable = ReturnType<typeof SetDisable>

type setFriends = ReturnType<typeof setFriends>

export type UsersActionType =
    FollowSuccess | SetUser
    | SetCurrentPage | SetTotalCount
    | ToggleLoader | SetDisable
    | setFriends
const initialState: UserPageType = {
    users: [],
    pageSize: 50,
    TotalCount: 0,
    currentPage: 1,
    isFetching: true,
    disabledMode: [],
    friends: [],
}

const FOLLOWED_TYPE = 'FOLLOWED_TYPE' as const
const SET_USER_TYPE = 'SET_USER_TYPE' as const
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE' as const
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT' as const
const TOGGLE_LOADER = 'TOGGLE_LOADER' as const
const SET_DISABLE = 'SET_DISABLE' as const

const SET_FRIENDS = 'SET_FRIENDS' as const

export type UserType = {
    id: number,
    photos: {small: null | string, large: null | string},
    followed: boolean,
    name: string,
    status: string
}

export default UserReducer;
