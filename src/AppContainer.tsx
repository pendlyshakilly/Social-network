import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./State/Store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Login from "./Components/Login/Login";
import Loader from "./Components/Utils/Loader/Loader";
import {Initialized} from "./State/App-reducer";

const AppContainer = () => {
    const initialized = useSelector<AppRootStateType>(state => state.initialized.initialized)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(Initialized())
    }, [])

    if (!initialized) {
        return <Loader/>
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={"/*"} Component={() => <App/>}/>
                    <Route path={"/login"} Component={() => <Login/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppContainer;