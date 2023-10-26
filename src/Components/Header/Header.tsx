import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {AppBar, Paper} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../State/Store";
import AccountMenu from "./AccountMenu/AccountMenu";


type PropsType = {}


const Header = (props: PropsType) => {
    const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)

    return <>
        <AppBar className={s.headerContainer} sx={{backgroundColor: 'whitesmoke'}}>
            <div>
                <div>
            </div>
            </div>
            <header className={s.header}>
                <img src='https://thumbs.dreamstime.com/b/teamwork-community-logo-design-vector-adoption-social-network-template-156215000.jpg'/>
                <a className={s.Navigate}>
                    <NavLink to={'/main'} style={{marginRight: '10px'}}><HomeIcon fontSize={'large'}/></NavLink>
                    <NavLink to={'/friends'}><PeopleOutlineIcon fontSize={'large'}/></NavLink>
                </a>
                {isAuth ? <AccountMenu/> : <NavLink to={'/login'} className={s.Login}>Login</NavLink>}
            </header>
        </AppBar>

    </>
}

export default Header;