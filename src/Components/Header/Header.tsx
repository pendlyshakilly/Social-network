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

    return <>
        <AppBar className={s.headerContainer} sx={{backgroundColor: 'whitesmoke'}}>
            <header className={s.header}>
                <img
                    src={Logo} style={{width: '50px', height: '50px', marginLeft: '0', margin: '5px'}}/>
                <a className={s.Navigate}>
                    <NavLink to={'/main'} style={{marginRight: '20px', width: '60px', margin: '5px 50px 0 0'}}>
                        {params['*'] === 'main' ?
                            <div>
                                <GroupsIcon fontSize={'large'}
                                            sx={{color: '#1976d2', marginLeft: '17px', width: '50px', height: '47px'}}/>
                                <Divider sx={{backgroundColor: '#1976d2', height: '3px', width: '85px'}}/>
                            </div>
                            :
                            <GroupsOutlinedIcon
                                sx={{color: '#808080', marginLeft: '17px', width: '50px', height: '47px'}}
                                fontSize={'large'}/>
                        }
                    </NavLink>
                    <NavLink to={'/friends'} style={{width: '60px', marginTop: '5px'}}>
                        {params['*'] === 'friends' ?
                            <div>
                                <PeopleIcon sx={{color: '#1976d2', marginLeft: '17px', width: '50px', height: '47px'}}
                                            fontSize={'large'} />
                                <Divider sx={{backgroundColor: '#1976d2', height: '3px', width: '85px'}}/>
                            </div>
                            :
                            <PeopleOutlineIcon fontSize={'large'} sx={{
                                color: '#808080',
                                marginLeft: '17px',
                                width: '50px',
                                height: '47px'
                            }}/>

                        }
                    </NavLink>
                </a>
                {isAuth ? <AccountMenu/> : <NavLink to={'/login'} className={s.Login}>Login</NavLink>}
            </header>
        </AppBar>

    </>
}

export default Header;