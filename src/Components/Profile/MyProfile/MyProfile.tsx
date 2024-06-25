import React, {useEffect, useState} from 'react';
import s from './MyProfile.module.css'
import Avatar from "@mui/material/Avatar";
import {Button, Dialog, DialogTitle, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../State/Store";
import {getFriends, UserType} from "../../../State/Users-reducer";
import User from "../../Users/User/User";
import DescriptionBlock from "../../Utils/DecriptionBlock/DescriptionBlock";
import ModifyWindow from "./ModifyWindow/ModifyWindow";
import {getMyProfile, MyProfileType} from "../../../State/Profile-reducer";

const MyProfile = () => {
    const friends = useSelector<AppRootStateType, UserType[]>(state => state.userPage.friends)
    const myProfile = useSelector<AppRootStateType, MyProfileType>(state => state.profilePage.MyProfile)
    const dispatch = useDispatch<AppDispatch>()
    const [mode, setMode] = useState(false)



    useEffect(() => {
        dispatch(getFriends())
        dispatch(getMyProfile())
    }, [])

    const onClickCloseHandler = () => {
      setMode(false)
    }


    return (
        <div className={s.MyProfile}>
            <div className={s.BigImg}>
                <img src={''}/>
            </div>
            <div className={s.MyProfileContainer}>
                <div className={s.ContainerHeader}>
                    <div style={{display: "flex", alignItems: 'start'}}>
                        <div style={{width: '168px', height: '168px'}}>
                            <Avatar alt={'user'} sx={{width: '168px', height: '168px'}} className={s.Avatar}
                                    src={myProfile.photos.small ? myProfile.photos.small : ''}/>
                        </div>
                        <div>
                            <h1 style={{marginTop: '-7px', marginLeft: '10px'}}>{myProfile.fullName}</h1>
                        </div>
                    </div>
                    <Dialog open={mode} onClose={onClickCloseHandler} maxWidth={false}>
                        <ModifyWindow closeModifyWindow={onClickCloseHandler}/>
                    </Dialog>
                    <div>
                        <Button variant={'contained'} sx={{borderRadius: '5px'}} onClick={() => setMode(true)}>Modifier Profile</Button>
                    </div>
                </div>
                <div className={s.ContainerDescription}>
                    <DescriptionBlock/>
                    <Paper elevation={4} className={s.FriendsContainer}>
                        {
                            friends.slice(0, 3).map((el: UserType) => <div className={s.User}>
                                <User id={el.id} status={el.status}
                                      photos={el.photos}
                                      name={el.name}
                                      followed={el.followed}/>
                            </div>
                        )}
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;