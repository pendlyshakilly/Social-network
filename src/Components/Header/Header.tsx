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

type PropsType = {}


const Header = (props: PropsType) => {
    const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)
    const params = useParams()

    return <>
        <AppBar className={s.headerContainer} sx={{backgroundColor: 'whitesmoke'}}>
            <div>
                <div>
                </div>
            </div>
            <header className={s.header}>
                <img
                    src='https://thumbs.dreamstime.com/b/teamwork-community-logo-design-vector-adoption-social-network-template-156215000.jpg'/>
                <a className={s.Navigate}>
                    <NavLink to={'/main'} style={{marginRight: '20px', width: '60px', margin: '0 auto'}}>
                        {params['*'] === 'main' ?
                            <div>
                                <GroupsIcon fontSize={'large'} sx={{color: '#1976d2', marginLeft: '13px'}}/>
                                <Divider sx={{backgroundColor: '#1976d2', height: '3px'}}/>
                            </div>
                            :
                            <GroupsOutlinedIcon sx={{color: '#808080', marginLeft: '13px'}} fontSize={'large'}/>
                        }
                    </NavLink>
                    <NavLink to={'/friends'} style={{width: '60px',}}>
                        {params['*'] === 'friends' ?
                            <div>
                                <PeopleIcon sx={{color: '#1b7ede', marginLeft: '14px'}} fontSize={'large'}/>
                                <Divider sx={{backgroundColor: '#1976d2', height: '3px'}}/>
                            </div>
                            :
                            <PeopleOutlineIcon fontSize={'large'} sx={{marginLeft: '14px', color: '#808080' }}/>

                        }
                    </NavLink>
                </a>
                {isAuth ? <AccountMenu/> : <NavLink to={'/login'} className={s.Login}>Login</NavLink>}
            </header>
        </AppBar>

    </>
}

export default Header;