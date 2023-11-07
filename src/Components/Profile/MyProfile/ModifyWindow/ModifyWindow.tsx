import React, {ChangeEvent, useState} from 'react';
import {Button, Paper, styled, Switch} from "@mui/material";
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
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../../State/Store";
import EditableField from "./modifyWindowComponent/EditableField";
import EditableFieldContacts from "./modifyWindowComponent/EditableFieldContacts";

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


type ModifyWindowPropsType = {}

const ModifyWindow = (props: ModifyWindowPropsType) => {
    const status = useSelector<AppRootStateType, string>(state => state.profilePage.MyStatus)
    const myProfile = useSelector<AppRootStateType, MyProfileType>(state => state.profilePage.MyProfile)
    const dispatch = useDispatch<AppDispatch>()

    const [profileDemo, setProfile] = useState<MyProfileType>(myProfile)
    const [statusDemo, setStatus] = useState(status)
    const [photo, setPhoto] = useState('')
    let style = {background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'}

    console.log(profileDemo)

    const onChangePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhoto(URL.createObjectURL(e.target.files[0]));
        }
    }
    const onClickHandler = () => {

        console.log(profileDemo)
       dispatch(updateMyProfile(profileDemo, statusDemo, photo))
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
        }]
    const Description = [
        {
            property: myProfile.fullName, modeWord: 'fullName',
            text: 'Add your full name', icon: BadgeIcon, title: 'Full name'
        },
        {
            property: myProfile.aboutMe, modeWord: 'aboutMe',
            text: 'Add information about you', icon: InfoIcon, title: 'About me'
        },
        {
            property: status, modeWord: 'status',
            text: 'Add your status', icon: DescriptionIcon, title: 'Status'
        },
        {
            property: myProfile.lookingForAJobDescription, modeWord: 'lookingForAJobDescription',
            text: 'Add your job description', icon: HomeRepairServiceIcon, title: 'Job description'
        },
    ]

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
                <button onClick={onClickHandler}>Save</button>
            </div>
        </Paper>
    </div>
};

export default ModifyWindow;


