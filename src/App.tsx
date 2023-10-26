import React, {memo} from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./State/Store";
import {Navigate, Route, Routes} from "react-router-dom";
import Users from "./Components/Users/Users";
import MyProfile from "./Components/Profile/MyProfile/MyProfile";
import UserProfile from "./Components/Profile/UserProfile/UserProfile";

const App =  React.memo(() => {
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isAuth)

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div>
            <header>
                <Header/>
            </header>
            <div className="App-wrapper">
                <div>
                    <Navbar/>
                </div>
                <div className="App-container">
                <Routes>
                    <Route path={'/my-profile'} Component={() => <MyProfile/>}/>
                    <Route path={'/user-profile/:userId?'} Component={() => <UserProfile/>}/>
                    <Route path={'/users'} Component={Users}/>
                </Routes>
                </div>
            </div>
        </div>
    );
})

export default App;
