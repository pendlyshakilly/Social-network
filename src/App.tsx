import React, {lazy} from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./State/Store";
import {Navigate, Route, Routes} from "react-router-dom";
import Users from "./Components/Users/Users";
import WithSuspense from "./Components/Utils/WithSuspense/WithSuspense";
import Friends from "./Components/Friends/Friends";
let MyProfile = lazy(() => import("./Components/Profile/MyProfile/MyProfile"))
let UserProfile = lazy(() => import("./Components/Profile/UserProfile/UserProfile"));


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
                    <Route path={'/my-profile'} Component={MyProfile} />
                    <Route path={'/'} Component={WithSuspense(MyProfile)} />
                    <Route path={'/user-profile/:userId?'} Component={WithSuspense(UserProfile)}/>
                    <Route path={'/users'} Component={Users}/>
                    <Route path={'/friends'} Component={Friends}/>
                </Routes>
                </div>
            </div>
        </div>
    );
})

export default App;
