import React, {useEffect, useState} from 'react';
import s from './MyProfile.module.css'
import Avatar from "@mui/material/Avatar";
import {Button, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../State/Store";
import {getFriends, UserType} from "../../../State/Users-reducer";
import User from "../../Users/User/User";
import DescriptionBlock from "../../Utils/DecriptionBlock/DescriptionBlock";
import ClearIcon from '@mui/icons-material/Clear';

const MyProfile = () => {
    const friends = useSelector<AppRootStateType, UserType[]>(state => state.userPage.friends)
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        dispatch(getFriends())
    }, [])

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
                                    src={'https://scontent.fcdg1-1.fna.fbcdn.' +
                                        'net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=VTT51jsf8n4AX8Dfpoq&_nc_ht=scontent.fcdg1-1.fna&oh=00_AfBTQWSQ6Mg0xFV6eMUHhbbDd9517uMJKdo6E3_YdLYhrQ&oe=65620AF8'}/>
                        </div>
                        <div>
                            <h1 style={{marginTop: '-7px', marginLeft: '10px'}}>Illia Pendlyshak</h1>
                        </div>
                    </div>
                    <div>
                        <Button variant={'contained'} sx={{borderRadius: '5px'}}>Modifier Profile</Button>
                    </div>
                </div>
                <div className={s.ContainerDescription}>
                    <DescriptionBlock/>
                        <Paper elevation={4} className={s.FriendsContainer}>
                            {friends.slice(0, 3).map((el: UserType) => <div className={s.User}>
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