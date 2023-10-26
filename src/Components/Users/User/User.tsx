import React from 'react';
import s from "./User.module.css";
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";
import {Follow} from "../../../State/Users-reducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../State/Store";

type PropsType = {
    id: number,
    status: string,
    photoUrl: string,
    name: string,
    disabledMode: [],
    followed: boolean
}


const User = React.memo(({id, status, photoUrl, name, followed, ...props}: PropsType) => {
    const dispatch = useDispatch<AppDispatch>()

    const follow = () => {
        dispatch(Follow(id, true))
    }
    const Unfollow = () => {
        dispatch(Follow(id, false))
    }
    return <div key={id} className={s.User}>
        <NavLink to={'/user-profile/' + id}>
            <img
                src={photoUrl == null ? 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png' : photoUrl}
                className={s.Img}/>
        </NavLink>
        <div>{name}</div>
        <span>
            <div>{status ? status : "status"}</div>
        </span>
        <div>
            {followed ?
                <Button disabled={props.disabledMode.some(i => i === id)} sx={{borderRadius: '10px'}} onClick={Unfollow}
                        className={s.UnFollow} variant={'contained'}>Un Follow</Button> :
                <Button onClick={follow} disabled={props.disabledMode.some(i => i === id)}
                        className={s.Follow} sx={{borderRadius: '10px'}} variant={'contained'}>Follow</Button>
            }
        </div>
    </div>
})

export default User;