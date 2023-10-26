import React, {useState} from 'react';
import {Button, Checkbox, FormControl, InputAdornment, Paper, TextField} from "@mui/material";
import s from "./Login.module.css"
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../State/Store";
import {login} from "../../State/Auth-reducer";
import {Navigate} from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from "@mui/material/IconButton";

interface formikValuesType {
    email: string,
    password: string,
    rememberMe: boolean
}

const Login = () => {
    const UseAppDispatch = () => useDispatch<AppDispatch>();
    const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)
    const dispatch = UseAppDispatch()
    const [visibilityMode, setVisibilityMode] = useState(false)


    const formik = useFormik<formikValuesType>({
        initialValues: {
            email: 'pendlyshakilly@gmail.com',
            password: 'pi22022007',
            rememberMe: false
        },
        validate(values: formikValuesType) {
            const errors: Partial<formikValuesType> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Min length 4 symbol'
            }


            return errors;
        },
        onSubmit: (values: formikValuesType) => {
            dispatch(login(values.email, values.password, values.rememberMe))
        },
    });

    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <Paper className={s.LoginContainer} elevation={24} sx={{backgroundColor: '#f1f1f1'}}>
            <form className={s.Form} onSubmit={formik.handleSubmit}>
                <h1><span>Login</span></h1>
                <TextField
                    id="email"
                    className={s.TextField}
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    id="password"
                    className={s.TextField}
                    name="password"
                    label="Password"
                    type={visibilityMode ? "text" : "password"}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                        endAdornment: (
                            <IconButton sx={{textAlign: 'center',marginLeft: '3px', color: 'black'}}>
                                {visibilityMode
                                    ? <VisibilityOffIcon onClick={() => setVisibilityMode(!visibilityMode)}/>
                                    : <VisibilityIcon onClick={() => setVisibilityMode(!visibilityMode)}/>}
                            </IconButton>
                        ),
                    }}
                />
                <div>
                    <Checkbox
                        id="rememberMe"
                        name="rememberMe"
                        value={formik.values.rememberMe}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    <span>Remember Me</span>
                </div>
                <Button type="submit"
                        className={s.Button}
                        sx={{borderRadius: '40px'}}
                        variant={'contained'}
                        disabled={!formik.values.email || !!(formik.errors.password || formik.errors.email)}>Submit</Button>
            </form>
        </Paper>
    );
};

export default Login;