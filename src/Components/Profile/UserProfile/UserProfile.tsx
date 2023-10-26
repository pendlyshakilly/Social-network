import React, {useEffect} from 'react';
import s from './UserProfile.module.css'
import {Button} from "@mui/material";
import {getUserPage, UserProfileType} from "../../../State/Profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../State/Store";
import {Follow} from "../../../State/Users-reducer";
import {useNavigate, useParams} from "react-router-dom";

const UserProfile = () => {
    const dispatch = useDispatch<AppDispatch>()
    const param = useParams<'userId'>()
    let navigate = useNavigate()
    useEffect(() => {
        if (param.userId) {
            dispatch(getUserPage(param.userId))
        } else {
            navigate(-1)
        }
    }, [])


    const UserProfile = useSelector<AppRootStateType, UserProfileType | null>(state => state.profilePage.UserProfile)

    const UserFollow = useSelector<AppRootStateType, boolean>(state => state.profilePage.UserFollow)


    const unFollow = () => {
        if (UserProfile)
            dispatch(Follow(UserProfile.userId, false))
    }
    const follow = () => {
        if (UserProfile)
            dispatch(Follow(UserProfile.userId, true))
    }
    return (
        <div className={s.UserProfileContainer}>
            <div className={s.ImageContainer}>
                <img
                    src={UserProfile?.photos.small ? UserProfile.photos.small : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}/>
            </div>
            <div>
                <div className={s.Navigate}>
                    <div><h1>{UserProfile?.fullName}</h1></div>
                    {UserFollow ?
                        <Button sx={{margin: '0px 20px 0px 20px', borderRadius: '10px'}}
                                variant={'contained'} onClick={unFollow}>UnFollow</Button>
                        :
                        <Button sx={{margin: '0px 20px 0px 20px', borderRadius: '10px'}}
                                variant={'contained'} onClick={follow}>Follow</Button>
                    }
                    <Button sx={{borderRadius: '10px'}} variant={'contained'}>Message</Button>
                </div>
                <div><h3>{!UserProfile?.aboutMe ? 'AboutMe' : UserProfile?.aboutMe}</h3></div>
                <div>{UserProfile?.status ? UserProfile?.status : 'Status'}</div>
            </div>
        </div>
    );
};


export default UserProfile;