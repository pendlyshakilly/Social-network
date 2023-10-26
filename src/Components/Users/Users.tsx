import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../State/Store";
import {Follow, GetUsers, UserPageType, UserType} from "../../State/Users-reducer";
import {Paper} from "@mui/material";
import s from './Users.module.css'
import User from "./User/User";

const Users = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {currentPage, pageSize, users, disabledMode} = useSelector<AppRootStateType, UserPageType>(state => state.userPage)


    useEffect(() => {
        dispatch(GetUsers(currentPage, pageSize))
    },[])


    return (
        <div className={s.UsersContainer}>
            {users.map((el: UserType) => <Paper className={s.User}>
                    <User id={el.id} status={el.status}
                          photoUrl={el.photoUrl}
                          name={el.name}
                          disabledMode={disabledMode}
                          followed={el.followed}/>
                </Paper>
            )}
        </div>
    );
};

export default Users;