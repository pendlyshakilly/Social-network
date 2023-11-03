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

    return <div key={id} className={s.User}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <NavLink to={'/user-profile/' + id}>
           <Avatar className={s.Avatar} sx={{width: '80px', height: '80px'}} src={photos.small ? photos.small : ''}/>
        </NavLink>
        <h3>{name}</h3>
        </div>
        <button className={s.Button}><NavLink to={'/user-profile/' + id} >View Profile</NavLink></button>
    </div>
})

export default User;