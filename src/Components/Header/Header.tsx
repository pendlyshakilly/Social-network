import React from "react";
import s from './Header.module.css'
import {NavLink, useParams} from "react-router-dom";
import {AppBar} from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../State/Store";
import AccountMenu from "./AccountMenu/AccountMenu";
import PeopleIcon from '@mui/icons-material/People';
import Divider from "@mui/material/Divider";
import Logo from './Logo.png'

type PropsType = {}


const Header = (props: PropsType) => {
    const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)
    const params = useParams()

    return <AppBar className={s.headerContainer} sx={{backgroundColor: '#2C3E50'}}>
        <header className={s.header}>
            <img
                src={Logo} style={{width: '50px', height: '50px', marginLeft: '0', margin: '10px'}}/>
            <a className={s.Navigate}>
                <NavLink to={'/users'} style={{marginRight: '20px', width: '60px', margin: '5px 50px 0 0'}}>
                    {params['*'] === 'users' ?
                        <div style={{marginTop: '5px'}}>
                            <GroupsIcon fontSize={'large'}
                                        sx={{color: '#005EE9', marginLeft: '17px', width: '50px', height: '47px'}}/>
                            <Divider sx={{backgroundColor: '#005EE9', height: '3px', width: '85px'}}/>
                        </div>
                        :
                        <GroupsOutlinedIcon
                            sx={{color: 'white', marginTop: '5px', marginLeft: '17px', width: '50px', height: '47px'}}
                            fontSize={'large'}/>
                    }
                </NavLink>
                <NavLink to={'/friends'} style={{width: '60px', marginTop: '5px'}}>
                    {params['*'] === 'friends' ?
                        <div style={{marginTop: '5px'}}>
                            <PeopleIcon sx={{color: '#005EE9', marginLeft: '17px', width: '50px', height: '47px'}}
                                        fontSize={'large'}/>
                            <Divider sx={{backgroundColor: '#005EE9', height: '3px', width: '85px'}}/>
                        </div>
                        :
                        <PeopleOutlineIcon fontSize={'large'} sx={{
                            color: 'white',
                            marginLeft: '17px',
                            width: '50px',
                            height: '47px',
                            marginTop: '5px'
                        }}/>

                    }
                </NavLink>
            </a>
            {isAuth ? <AccountMenu/> : <NavLink to={'/login'} className={s.Login}>Login</NavLink>}
        </header>
    </AppBar>
}

export default Header;