import React, {useEffect} from 'react';
import s from './UserProfile.module.css'
import {Button} from "@mui/material";
import {getUserPage, UserProfileType} from "../../../State/Profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../State/Store";
import {Follow} from "../../../State/Users-reducer";
import {useNavigate, useParams} from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const UserProfile = () => {
    const dispatch = useDispatch<AppDispatch>()
    const param = useParams<'userId'>()
    const UserProfile = useSelector<AppRootStateType, UserProfileType | null>(state => state.profilePage.UserProfile)
    const UserFollow = useSelector<AppRootStateType, boolean>(state => state.profilePage.UserFollow)
    let navigate = useNavigate()


    useEffect(() => {
        if (param.userId) {
            dispatch(getUserPage(param.userId))
        } else {
            navigate(-1)
        }
    }, [param.userId])


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
            <div className={s.ContainerHeader}>
                <div className={s.BigImg}>
                    <img src={''}/>
                </div>
                <div className={s.Container}>
                <div style={{display: 'flex', alignItems: 'end'}}>
                    <div className={s.ImageContainer}>
                        <Avatar alt={'user'} sx={{width: '168px', height: '168px'}} className={s.Avatar}
                            src={UserProfile?.photos.small ? UserProfile.photos.small : ''}/>
                    </div>
                    <div style={{margin: '0 50px 0 0'}}><h1 style={{margin: '0'}}>{UserProfile?.fullName}</h1></div>
                </div>

                <div className={s.Navigate}>
                    {UserFollow ?
                        <Button sx={{margin: '0px 20px 0px 20px', borderRadius: '10px'}}
                                variant={'contained'} onClick={unFollow}>UnFollow</Button>
                        :
                        <Button sx={{margin: '0px 20px 0px 20px', borderRadius: '10px'}}
                                variant={'contained'} onClick={follow}>Follow</Button>
                    }
                    <Button sx={{borderRadius: '10px'}} variant={'contained'}>Message</Button>
                </div>
            </div>
        </div>
</div>
)
    ;
};


export default UserProfile;