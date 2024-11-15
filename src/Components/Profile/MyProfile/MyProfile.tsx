import React, {useEffect, useState} from 'react';
import s from './MyProfile.module.css'
import Avatar from "@mui/material/Avatar";
import {Button, Dialog, DialogTitle, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../State/Store";
import {getFriends, UserType} from "../../../State/Users-reducer";
import User from "../../Users/User/User";
import DescriptionBlock from "../../Utils/DecriptionBlock/DescriptionBlock";
import ModifyProfilePopup from "./ModifyProfilePopup/ModifyProfilePopup";
import {getMyProfile, MyProfileType} from "../../../State/Profile-reducer";
import SliderForFriends from "./Swiper/SliderForFriends";

const MyProfile = () => {
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
                        <ModifyProfilePopup closeModifyWindow={onClickCloseHandler}/>
                    </Dialog>
                    <div>
                        <Button variant={'contained'} sx={{borderRadius: '5px'}} onClick={() => setMode(true)}>Modifier Profile</Button>
                    </div>
                </div>
                <div className={s.ContainerDescription}>
                    <DescriptionBlock/>

                    <Paper elevation={4} className={s.FriendsContainer}>
                        <SliderForFriends/>
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;