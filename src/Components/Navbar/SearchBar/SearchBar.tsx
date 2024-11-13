import React, {ChangeEvent, useEffect, useState} from 'react';
import {InputBase, Paper} from "@mui/material";
import s from './SearchBar.module.css'
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import Divider from "@mui/material/Divider";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../State/Store";
import {
    DeleteRecentUser,
    findUser,
    FoundUsers,
    SetRecentUser,
    UserPageType,
    UserType
} from "../../../State/Users-reducer";
import Avatar from "@mui/material/Avatar";
import {NavLink} from "react-router-dom";
import {DeleteError} from "../../../State/App-reducer";
import ClearIcon from '@mui/icons-material/Clear';
import styles from "./SearchBar.module.css";

type SearchPropsType = {
    onClickAway: () => void
}

const SearchBar = (props: SearchPropsType) => {
    const [value, setValue] = useState('')
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const foundUsers = useSelector<AppRootStateType, UserType[]>(state => state.userPage.foundUsers)
    const recentUser = useSelector<AppRootStateType, UserType[]>(state => state.userPage.recentUser)
    const errors = useSelector<AppRootStateType, string[]>(state => state.initialized.errors)



    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    useEffect(() => {
        timerId && clearTimeout(timerId)
        if (value.trim() !== '') {
            let id = setTimeout(() => {
                dispatch(findUser(value))
            }, 700)
            setTimerId(id)
        } else {
            dispatch(FoundUsers([]))
            dispatch(DeleteError('UserNotFound'))
        }
    }, [value])
    const onClickHandler = (user: UserType) => {
        props.onClickAway()
        dispatch(SetRecentUser(user))
        dispatch(DeleteError('UserNotFound'))
    }

    const DeleteHandler = (id: number) => {
        dispatch(DeleteRecentUser(id))
    }


    return (
        <div >
            <div className={s.searchContainer}>
                <div className={s.searchBlockContainer}
                     style={foundUsers.length !== 0 ? {height: '150px'} : {height: '180px'}}>
                    <div className={s.search}>
                        <Paper component="form"
                               sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: "90%"}}>
                            <InputBase
                                onChange={onChangeHandler}
                                sx={{ml: 1, flex: 1}}
                                placeholder="SearchBar user"
                                inputProps={{'aria-label': 'search google maps'}}
                            />
                            <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </Paper>
                    </div>
                    <Divider sx={{width: '100%', height: '4px', marginTop: '20px'}}/>
                    {foundUsers.length === 0 && !errors.some(el => el === 'UserNotFound') && <h3>Recent</h3>}
                </div>
                <div className={s.responseContainer}>
                    {foundUsers.length !== 0 ? foundUsers.map(el => {
                        return <NavLink to={'/user-profile/' + el.id} className={s.usersResponse}
                                        onClick={() => onClickHandler(el)}>
                            <Avatar src={el.photos.small ? el.photos.small : ''}/>
                            <h5 style={{marginLeft: '10px', fontSize: '14px'}}>{el.name}</h5>
                        </NavLink>
                    }) : errors.some(el => el === 'UserNotFound') ?
                        <div style={{color: '#5D5D5DFF', position: 'absolute', left: '60px', bottom: '300px'}}>
                            No results found
                        </div>
                        :
                        recentUser.length !== 0 ? recentUser.map(el => {
                                return <div style={{display: 'flex', alignItems: 'center'}}>
                                <NavLink to={'/user-profile/' + el.id} className={s.usersResponse}
                                                onClick={() => onClickHandler(el)}>
                                    <Avatar src={el.photos.small ? el.photos.small : ''}/>
                                    <h5 style={{marginLeft: '10px', fontSize: '14px'}}>{el.name}</h5>
                                </NavLink>
                                    <ClearIcon fontSize={'medium'} sx={{cursor: 'pointer', marginRight: '10px'}} onClick={() => DeleteHandler(el.id)}/>
                                </div>
                            })
                            : <div style={{color: '#5D5D5DFF', position: 'absolute', left: '60px', bottom: '300px'}}>
                                No recent searches
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchBar;