import React, {useState} from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";


const Navbar = () => {
    const [state, setState] = useState(false)
    return <nav className={s.nav}>
        <div>
            <div className={s.item}>
                <NavLink to={"/my-profile"}><img src={''}/>Profile</NavLink>
            </div>
            <div className={s.item}>
                <a onClick={() => setState(!state)}>Search</a>
            </div>
            <div className={s.item}>
                <NavLink to={"/dialogs"}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={"/users"}>Users</NavLink>
            </div>
            <div>
            </div>
        </div>
        {state ? <div>
            <div className={s.item}>
                <NavLink to={"/profile"}><img src={''}/>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to={"/dialogs"}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={"/users"}>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={"/music"}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={"/settings"}>Settings</NavLink>
            </div>
        </div> : null}
    </nav>
}

export default Navbar;