import React, {ChangeEvent, useState} from 'react';
import {Button, Dialog, Paper, styled, Switch} from "@mui/material";
import s from './ModifyWindow.module.css'
import Avatar from "@mui/material/Avatar";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {MyProfileType, updateMyProfile} from "../../../../State/Profile-reducer";
import BadgeIcon from '@mui/icons-material/Badge';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../../State/Store";
import EditableField from "./modifyWindowComponent/EditableField";
import EditableFieldContacts from "./modifyWindowComponent/EditableFieldContacts";
import ClearIcon from '@mui/icons-material/Clear';

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
    closeModifyWindow: () => void
}

const ModifyWindow = (props: ModifyWindowPropsType) => {
    const status = useSelector<AppRootStateType, string>(state => state.profilePage.MyStatus)
    const myProfile = useSelector<AppRootStateType, MyProfileType>(state => state.profilePage.MyProfile)
    const dispatch = useDispatch<AppDispatch>()


    const [profileDemo, setProfile] = useState<MyProfileType>(myProfile)
    const [statusDemo, setStatus] = useState(status)
    const [photo, setPhoto] = useState<{ url: string | null, blob: File | null }>({
        url: myProfile.photos.small,
        blob: null})
    let style = {background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'}


    const onChangePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPhoto({url: URL.createObjectURL(e.target.files[0]), blob: e.target.files[0]})
        }
    }
    const onClickSaveHandler = () => {
        dispatch(updateMyProfile(profileDemo, statusDemo, photo.blob))
    }
    const onClickCloseHandler = () => {
        props.closeModifyWindow()
    }


    const Contacts = [
        {
            property: myProfile.contacts.instagram, modeWord: 'instagram',
            style: style, icon: InstagramIcon
        },
        {
            property: myProfile.contacts.facebook, modeWord: 'facebook',
            style: {backgroundColor: '#1778F2'}, icon: FacebookOutlinedIcon
        },
        {
            property: myProfile.contacts.github, modeWord: 'github',
            style: {backgroundColor: 'black'}, icon: GitHubIcon
        },
        {
            property: myProfile.contacts.twitter, modeWord: 'twitter',
            style: {backgroundColor: '#1778F2'}, icon: TwitterIcon
        },
        {
            property: myProfile.contacts.youtube, modeWord: 'youtube',
            style: {backgroundColor: 'red'}, icon: YouTubeIcon
        }
        ]
    const Description = [
        {
            property: profileDemo.fullName, modeWord: 'fullName',
            text: 'Add your full name', icon: BadgeIcon, title: 'Full name'
        },
        {
            property: profileDemo.aboutMe, modeWord: 'aboutMe',
            text: 'Add information about you', icon: InfoIcon, title: 'About me'
        },
        {
            property: statusDemo, modeWord: 'status',
            text: 'Add your status', icon: DescriptionIcon, title: 'Status'
        },
        {
            property: profileDemo.lookingForAJobDescription, modeWord: 'lookingForAJobDescription',
            text: 'Add your job description', icon: HomeRepairServiceIcon, title: 'Job description'
        },
    ]



    return <div className={s.ModifyWindow}>
        <Paper sx={{width: '60vh', height: '100%', position: 'relative'}}>
            <Paper className={s.ModifyWindowHeader}>
                <h2 style={{textAlign: 'center', marginLeft: '20px'}}>Modify profile</h2>
                <div onClick={onClickCloseHandler}>
                    <ClearIcon className={s.ClearIcon}/>
                </div>
            </Paper>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', marginTop: '10px'}}>
                <Avatar sx={{width: '120px', height: '120px', margin: '0 auto'}}
                        src={photo.url ? photo.url : ''}/>
                <label className={s.Label}>
                    <AddAPhotoIcon fontSize={'small'} sx={{position: 'relative', top: '6px', right: '1px', color: 'white'}}/>
                    <input type="file" id='image' onChange={onChangePhotoHandler} accept="image/*" className={s.InputFile}/>
                </label>
                <h3 style={{margin: '-20px 0 10px 0'}}>
                    {profileDemo.fullName ? profileDemo.fullName.length >= 43 ? profileDemo.fullName.substring(0, 43) + '...' : profileDemo.fullName : 'No Name'}
                </h3>
            </div>
            <div style={{marginLeft: '0px'}}>
                {Description.map(el => {
                    return <EditableField property={el.property}
                                          setValue={(obj => {
                                              el.modeWord === 'status' ?
                                                  typeof obj === "string" && setStatus(obj)
                                                  : typeof obj === "object" && setProfile(obj)
                                          })}
                                          icon={el.icon}
                                          title={el.title}
                                          text={el.text}
                                          modeWord={el.modeWord}
                                          profileDemo={profileDemo}
                    />
                })}
                <div>
                    <h3>Search job</h3>
                    <Switch checked={profileDemo.lookingForAJob}
                            onChange={(event, checked) => {
                                profileDemo && setProfile({
                                    ...profileDemo,
                                    contacts: {...profileDemo.contacts},
                                    lookingForAJob: checked
                                })
                            }}/>
                </div>
                <h3>Add social media</h3>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {Contacts.map(el => {
                        return <EditableFieldContacts property={el.property}
                                                      modeWord={el.modeWord}
                                                      style={el.style}
                                                      setValue={(obj: MyProfileType) => setProfile(obj)}
                                                      icon={el.icon}
                                                      profileDemo={profileDemo}
                        />
                    })}
                </div>
                <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '10px'}}>
                    <Button className={s.Button} variant={'contained'} onClick={onClickSaveHandler}>Save</Button>
                </div>
            </div>
        </Paper>
    </div>
};

export default ModifyWindow;


