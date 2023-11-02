import {AppThunk} from "./Store";
import {ProfileAPI} from "../Dal/API";

const USER_PROFILE_TYPE = 'USER_PAGE' as const
const SET_USER_STATUS_TYPE = 'SET_USER_STATUS' as const
const SET_USER_FOLLOWED_STATUS_TYPE = 'SET_USER_FOLLOWED_STATUS_TYPE' as const

type setUserPageType = ReturnType<typeof setUserPage>
type setUserStatusSuccessType = ReturnType<typeof setMyStatusSuccess>
type setUserFollowedType = ReturnType<typeof setUserFollow>
export type ProfileActionsType = setUserPageType | setUserStatusSuccessType | setUserFollowedType



export const setUserPage = (data: UserProfileType) => ({type: USER_PROFILE_TYPE, data} as const)
export const setUserFollow = (status: boolean) => ({type: SET_USER_FOLLOWED_STATUS_TYPE, status} as const)
export const setMyStatusSuccess = (status: string) => ({type: SET_USER_STATUS_TYPE, status} as const)


export const setMyStatus = (status: string): AppThunk => (dispatch) => {
    ProfileAPI.updateStatus(status)
        .then(res => {

            dispatch(setMyStatusSuccess(status))
        })
        .catch(e => alert(e))
}

export const getUserPage = (userId: string): AppThunk => (dispatch) => {
    let getProfile = ProfileAPI.getProfile(userId).then(response => response)
    let getStatus = ProfileAPI.getStatus(userId).then(res => res)
    let getUserFollow = ProfileAPI.getUserFollow(userId).then(res => res)

    Promise.all([getProfile, getStatus, getUserFollow]).then((res: any) => {
        let newUserProfile = {...res[0], status: res[1].statusText}
        dispatch(setUserFollow(res[2].data))
        dispatch(setUserPage(newUserProfile))
    })
}

const initialState: ProfilePageType = {
    UserProfile: null,
    MyStatus: '',
    UserFollow: false
}

const ProfileReducer = (state: ProfilePageType = initialState, action: ProfileActionsType): ProfilePageType => {
    switch (action.type) {
        case USER_PROFILE_TYPE:
            return {...state, UserProfile: action.data}
        case SET_USER_STATUS_TYPE:
            return {...state, MyStatus: action.status}
        case SET_USER_FOLLOWED_STATUS_TYPE:
            return {...state, UserFollow: action.status}
    }
    return state
}


export default ProfileReducer;

export type ProfilePageType = {
    UserProfile: UserProfileType | null
    MyStatus: string
    UserFollow: boolean
}

export type UserProfileType = {
    aboutMe: null
    contacts: {
        facebook: null
        github: null
        instagram: null
        mainLink: null
        twitter: null
        vk: null
        website: null
        youtube: null
    }
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: null
    photos: { small: null | string, large: null | string }
    status: string
    userId: number
}