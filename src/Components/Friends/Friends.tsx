import React, {useEffect} from 'react';
import s from './Friends.module.css'
import {Button, Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TelegramIcon from '@mui/icons-material/Telegram';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../State/Store";
import {Follow, getFriends, UserPageType} from "../../State/Users-reducer";
import {useNavigate} from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Friends = () => {
    const {friends} = useSelector<AppRootStateType, UserPageType>(state => state.userPage)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getFriends())
    }, [dispatch])


    const UnFollowHandler = (id: number) => {
        dispatch(Follow(id, false))
    }
    const onClickHandler = (id: number) => {
        navigate('/user-profile/' + id)
    }

    return (
        <div className={s.Friends}>
            <div className={s.AllFriendsContainer}>
                {friends.map((el) => {
                    return <Paper elevation={4} className={s.FriendContainer}>
                        <div  className={s.ImageContainer}>
                            {el.photos.large ?
                                <img style={{height: '100%', width: '100%'}} src={`${el.photos.large}`}/>
                                : <img src={''}/>
                            }
                            </div>
                        <Avatar onClick={() => onClickHandler(el.id)} className={s.Avatar}
                                src={el.photos.small ? el.photos.small : ''}
                                sx={{height: '80px', width: '80px'}}/>
                        <div className={s.Name}>
                            <h2 style={{margin: '0 0 3px 0'}}><span>{el.name}</span></h2>
                            <div>{!el.status ? 'Without status' : el.status}</div>
                        </div>

                        <div style={{margin: '0 auto', display: 'flex', justifyContent: 'center'}}>
                            <Button onClick={() => onClickHandler(el.id)}><Avatar sx={{backgroundColor: '#1976d2'}} ><PersonOutlineIcon/></Avatar></Button>
                            <Button><Avatar sx={{backgroundColor: '#1976d2'}}><TelegramIcon/></Avatar></Button>
                            <Button variant={'contained'}
                                    sx={{borderRadius: '10px', marginLeft: '10px'}}
                                    onClick={() => UnFollowHandler(el.id)}>UnFollow</Button>

                        </div>
                    </Paper>
                })}
            </div>
        </div>
    )
        ;
};

export default Friends;