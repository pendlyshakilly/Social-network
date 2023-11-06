import React from 'react';
import s from "./User.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import Avatar from "@mui/material/Avatar";

type PropsType = {
    id: number,
    status: string,
    photos: {small: null | string, large: null | string},
    name: string,
    followed: boolean
}


const User = React.memo(({id, status, photos, name, followed, ...props}: PropsType) => {
const navigate = useNavigate()

    return <div key={id} className={s.User}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <NavLink to={'/user-profile/' + id}>
           <Avatar className={s.Avatar} sx={{width: '80px', height: '80px'}} src={photos.small ? photos.small : ''}/>
        </NavLink>
        <h3>{name}</h3>
        </div>
        <button onClick={() => navigate('/user-profile/' + id)} className={s.Button}><a>View Profile</a></button>
    </div>
})

export default User;