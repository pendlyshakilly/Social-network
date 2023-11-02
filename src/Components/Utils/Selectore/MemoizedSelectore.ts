import { createSelector } from 'reselect';
import {AppRootStateType} from "../../../State/Store";
import {useSelector} from "react-redux";
; // Замініть на ваш тип кореневого стану

// Створюємо селектор для isLoggedIn
const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isAuth;

// Створюємо мемоїзований селектор за допомогою createSelector
const selectMemoizedIsLoggedIn = createSelector(
    [selectIsLoggedIn],
    (isLoggedIn) => isLoggedIn
);

// Використовуємо selectMemoizedIsLoggedIn в компоненті
const isLoggedIn = useSelector((state: AppRootStateType) => selectMemoizedIsLoggedIn(state));