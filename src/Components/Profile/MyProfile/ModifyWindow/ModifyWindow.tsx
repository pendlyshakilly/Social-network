import React, {ChangeEvent, useState} from 'react';
import {Button, Paper, styled, Switch, TextField} from "@mui/material";
import s from './ModifyWindow.module.css'
import Avatar from "@mui/material/Avatar";
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {MyProfileType} from "../../../../State/Profile-reducer";
import EditIcon from '@mui/icons-material/Edit';
import BadgeIcon from '@mui/icons-material/Badge';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../State/Store";


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


type ModifyWindowPropsType = {
    myProfile: MyProfileType | null
}

const ModifyWindow = (props: ModifyWindowPropsType) => {
    const status = useSelector<AppRootStateType, string>(state => state.profilePage.MyStatus)
    const myProfile = useSelector<AppRootStateType, MyProfileType | null>(state => state.profilePage.MyProfile)

    const [mode, setMode] = useState<string[]>([])
    const [profileDemo, setProfile] = useState<MyProfileType | null>(props.myProfile)
    const [statusDemo, setStatus] = useState('')
    const [photo, setPhoto] = useState('')
    let style = {background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',}


    const onChangePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhoto(URL.createObjectURL(e.target.files[0]));
        }
    }



    return <div className={s.ModifyWindow}>
        <Paper sx={{width: '90vh', height: '100%'}}>
            <h2 style={{textAlign: 'center'}}>Modify profile</h2>
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', margin: '0 10px 0 10px'}}>
                    <h3>Profile photo</h3>
                    <Button component="label" sx={{color: '#1976d2'}}>
                        Add
                        <VisuallyHiddenInput multiple accept="image/*" onChange={onChangePhotoHandler} type="file"/>
                    </Button>
                </div>
                <Avatar sx={{width: '120px', height: '120px', margin: '0 auto'}} src={photo}/>
            </div>
            <div style={{marginLeft: '10px'}}>


                <div>
                    <h3>Search job</h3>
                    <Switch onChange={() => profileDemo && setProfile({
                        ...profileDemo,
                        contacts: {...profileDemo.contacts},
                        lookingForAJob: !profileDemo.lookingForAJob
                    })}/>
                </div>
                <h3>Add social media</h3>
                <div className={s.DescriptionPosition}>
                    <Avatar style={style} sx={{marginRight: '5px'}}>
                        <InstagramIcon fontSize={'medium'}/>
                    </Avatar>
                    {mode.some(i => i === 'instagram') ?
                        <TextField autoFocus={true} onChange={(e) => profileDemo && setProfile({
                            ...profileDemo,
                            contacts: {...profileDemo.contacts, instagram: e.target.value}
                        })} onBlur={() => setMode([])} id="outlined-basic" label="Type your nickname"
                                   defaultValue={''} variant='outlined'/>
                        :
                        <div className={s.AddIcon}>
                            <AddIcon/>
                            <span onClick={() => setMode(['instagram'])}>Add your profileDemo</span>
                        </div>
                    }

                </div>
                <div className={s.DescriptionPosition} style={{margin: '10px 0 10px 0'}}>
                    <Avatar sx={{backgroundColor: '#1778F2', cursor: 'pointer', marginRight: '5px'}}>
                        <FacebookOutlinedIcon fontSize={'medium'}/>
                    </Avatar>
                    {mode.some(i => i === 'facebook') ?
                        <TextField autoFocus={true} onChange={(e) => profileDemo && setProfile({
                            ...profileDemo,
                            contacts: {...profileDemo.contacts, facebook: e.target.value}
                        })} onBlur={() => setMode([])} id="outlined-basic" label="Type your nickname"
                                   defaultValue={''} variant='outlined'/>
                        :
                        <div className={s.AddIcon}>
                            <AddIcon/>
                            <span onClick={() => setMode(['facebook'])}>Add your profileDemo</span>
                        </div>
                    }

                </div>
                <div className={s.DescriptionPosition} style={{margin: '5px 0 10px 0'}}>
                    <Avatar sx={{backgroundColor: 'white', cursor: 'pointer', marginRight: '5px'}}>
                        <TwitterIcon fontSize={'large'} sx={{color: '#1DA1F2'}}/>
                    </Avatar>
                    {mode.some(i => i === 'twitter') ?
                        <TextField autoFocus={true} onChange={(e) => profileDemo && setProfile({
                            ...profileDemo,
                            contacts: {...profileDemo.contacts, twitter: e.target.value}
                        })} onBlur={() => setMode([])} id="outlined-basic"
                                   label="Type your nickname"
                                   defaultValue={''} variant='outlined'/>
                        :
                        <div className={s.AddIcon}>
                            <AddIcon/>
                            <span onClick={() => setMode(['twitter'])}>Add your profileDemo</span>
                        </div>
                    }

                </div>
                <div className={s.DescriptionPosition} style={{margin: '5px 0 10px 0'}}>
                    <Avatar sx={{backgroundColor: 'black', cursor: 'pointer', marginRight: '5px'}}>
                        <GitHubIcon fontSize={'medium'}/>
                    </Avatar>
                    {mode.some(i => i === 'gitHub') ?
                        <TextField autoFocus={true} onChange={(e) => profileDemo && setProfile({
                            ...profileDemo,
                            contacts: {...profileDemo.contacts, github: e.target.value}
                        })} onBlur={() => setMode([])} id="outlined-basic"
                                   label="Type your nickname"
                                   defaultValue={''} variant='outlined'/>
                        :
                        <div className={s.AddIcon}>
                            <AddIcon/>
                            <span onClick={() => setMode(['gitHub'])}>Add your profileDemo</span>
                        </div>
                    }

                </div>
                <div className={s.DescriptionPosition} style={{margin: '5px 0 0 0'}}>
                    <Avatar sx={{backgroundColor: 'white', cursor: 'pointer', marginRight: '5px'}}>
                        <YouTubeIcon fontSize={'large'} sx={{color: 'red'}}/>
                    </Avatar>
                    {mode.some(i => i === 'youTube') ?
                        <TextField autoFocus={true} onChange={(e) => profileDemo && setProfile({
                            ...profileDemo,
                            contacts: {...profileDemo.contacts, youtube: e.target.value}
                        })} onBlur={() => setMode([])} id="outlined-basic"
                                   label="Type your nickname"
                                   defaultValue={''} variant='outlined'/>
                        :
                        <div className={s.AddIcon}>
                            <AddIcon/>
                            <span onClick={() => setMode(['youTube'])}>Add your profileDemo</span>
                        </div>
                    }

                </div>
            </div>
        </Paper>
    </div>
};

export default ModifyWindow;


