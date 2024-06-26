import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../State/Store";
import {GetUsers, UserType} from "../../State/Users-reducer";
import {Paper} from "@mui/material";
import s from './Users.module.css'
import User from "./User/User";

const Users = React.memo(() => {
    const dispatch = useDispatch<AppDispatch>()
    const currentPage = useSelector<AppRootStateType, number>(state => state.userPage.currentPage)
    const pageSize = useSelector<AppRootStateType, number>(state => state.userPage.pageSize)
    const users = useSelector<AppRootStateType, UserType[]>(state => state.userPage.users)



    useEffect(() => {
        dispatch(GetUsers(currentPage, pageSize))
    },[])



    return (
        <div className={s.Users}>
        <div className={s.UsersContainer}>
            {users.map((el: UserType) => <Paper className={s.User}>
                    <User id={el.id} status={el.status}
                          photos={el.photos}
                          name={el.name}
                          followed={el.followed}/>
                </Paper>
            )}
        </div>
        </div>
    );
})

export default Users;