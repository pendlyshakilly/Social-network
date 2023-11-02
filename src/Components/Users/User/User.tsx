import React from 'react';
import s from "./User.module.css";
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";
import {Follow} from "../../../State/Users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../State/Store";
import Avatar from "@mui/material/Avatar";

type PropsType = {
    id: number,
    status: string,
    photos: {small: null | string, large: null | string},
    name: string,
    followed: boolean
}


const User = React.memo(({id, status, photos, name, followed, ...props}: PropsType) => {
    const dispatch = useDispatch<AppDispatch>()
    const disabledMode = useSelector<AppRootStateType, [] | number[]>(state => state.userPage.disabledMode)

    const follow = () => {
        dispatch(Follow(id, true))
    }
    const Unfollow = () => {
        dispatch(Follow(id, false))
    }
    return <div key={id} className={s.User}>
        <NavLink to={'/user-profile/' + id}>
           <Avatar sx={{width: '50px', height: '50px'}} src={photos.small == null ? 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png' : photos.small}/>
        </NavLink>
        <div>{name}</div>
        <div>
            {followed ?
                <Button disabled={disabledMode.some(i => i === id)} sx={{borderRadius: '10px'}} onClick={Unfollow}
                        className={s.UnFollow} variant={'contained'}>Un Follow</Button> :
                <Button onClick={follow} disabled={disabledMode.some(i => i === id)}
                        className={s.Follow} sx={{borderRadius: '10px'}} variant={'contained'}>Follow</Button>
            }
        </div>
    </div>
})

export default User;