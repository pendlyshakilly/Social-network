import React, {lazy} from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/Store";
import {Navigate, Route, Routes} from "react-router-dom";
import WithSuspense from "./Components/Utils/WithSuspense/WithSuspense";
import UserProfile from "./Components/Profile/UserProfile/UserProfile"
import {SetSearchMode} from "./State/App-reducer";

let Friends = lazy(() =>  import("./Components/Friends/Friends"))
let MyProfile = lazy(() => import("./Components/Profile/MyProfile/MyProfile"))
let Users = lazy(() => import("./Components/Users/Users"))

const App = React.memo(() => {
   const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isAuth)
    const dispatch = useDispatch()


    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    const onClickChangeModeHandler = () => {
        dispatch(SetSearchMode(false))
    }


    console.log('App render')

    return (
        <div>
            <header onClick={onClickChangeModeHandler}>
                <Header/>
            </header>
            <div className="App-wrapper">
                <Navbar/>
                <div onClick={onClickChangeModeHandler} className="App-container">
                    <Routes>
                        <Route path={'/my-profile'} Component={MyProfile}/>
                        <Route path={'/'} Component={WithSuspense(MyProfile)}/>
                        <Route path={'/user-profile/:userId?'} Component={UserProfile}/>
                        <Route path={'/users'} Component={WithSuspense(Users)}/>
                        <Route path={'/friends'} Component={WithSuspense(Friends)}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
})

export default App;
