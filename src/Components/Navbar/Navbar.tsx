import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import TelegramIcon from '@mui/icons-material/Telegram';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchBar from "./SearchBar/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../State/Store";
import {AppInitialStateType, SetSearchMode} from "../../State/App-reducer";
import styles from './SearchBar/SearchBar.module.css'

const Navbar = () => {

    const {searchMode} = useSelector<AppRootStateType, AppInitialStateType>(state => state.initialized)
    const dispatch = useDispatch<AppDispatch>()

    let style = searchMode ? {display: 'flex', alignItems: 'center', marginLeft: '5px', width: '45px'}
        : {display: 'flex', alignItems: 'center', marginLeft: '5px'}
    let sx = {margin: '0 10px 0 5px', color: '#0f4a8d'}


    const setSearchMode = (status: boolean) => {
        dispatch(SetSearchMode(status))
    }

    return <div className={s.navbarContainer}>
        <nav className={s.nav}>
            <div className={s.navIcons}>
                <NavLink to={"/my-profile"} className={s.item} style={style} onClick={() => setSearchMode(false)}>
                    <AccountCircleIcon fontSize={'large'} sx={sx}/>
                    {!searchMode && <span>Profile</span>}
                </NavLink>
                <a className={s.item} id={'search-button'} style={style} onClick={() => setSearchMode(!searchMode)}>
                    <SearchIcon fontSize={'large'} sx={sx}/>
                    {!searchMode && <span>Search</span>}
                </a>
                <NavLink to={"/dialogs"} className={s.item} onClick={() => setSearchMode(false)} style={style}>
                    <TelegramIcon fontSize={'large'} sx={sx}/>
                    {!searchMode && <span>Messages</span>}
                </NavLink>
                <NavLink to={"/users"} className={s.item} onClick={() => setSearchMode(false)} style={style}>
                    <GroupsIcon fontSize={'large'} sx={sx}/>
                    {!searchMode && <span>Users</span>}
                </NavLink>
                <div>
                </div>
            </div>
            {searchMode &&
                <div className={`${styles.searchWrapper} ${searchMode ? styles.open : styles.closed}`}>
                    <SearchBar onClickAway={() => {
                        setSearchMode(false)
                    }}/>
                </div>
            }
        </nav>
    </div>
}

export default Navbar;