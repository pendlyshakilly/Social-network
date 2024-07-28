import React, {ChangeEvent, useState} from 'react';
import {Button, Paper, Switch} from "@mui/material";
import s from './ModifyProfilePopup.module.css'
import Avatar from "@mui/material/Avatar";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import SearchIcon from '@mui/icons-material/Search';
import {MyProfileType, updateMyProfile} from "../../../../State/Profile-reducer";
import BadgeIcon from '@mui/icons-material/Badge';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../../State/Store";
import DescriptionBlock from "./сomponents/DescriptionBlock/DescriptionBlock";
import ContactsBlock from "./сomponents/ContactsBlock/ContactsBlock";
import CircularProgress from '@mui/material/CircularProgress';
import ProfileDetailsEditPopup from "./сomponents/ProfileDetailsEditPopup/ProfileDetailsEditPopup";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import {Twitter} from "@mui/icons-material";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

type ModifyWindowPropsType = {
    closeModifyWindow: () => void
}

type ContactType = {
    link: string | null
    mode: SocialEnum
}

export type PopupDataType = {
    isOpen: boolean
    type: PopupType | null
    inputText: string | null
    mode: string | null
}

//TODO: Move types to better place
export enum SocialEnum {
    INSTAGRAM = 'instagram',
    GITHUB = 'github',
    TWITTER = 'twitter',
    YOUTUBE = 'youtube'
}

export type PopupType = 'desc' | 'contact'

const ModifyProfilePopup = ({closeModifyWindow}: ModifyWindowPropsType) => {
    const status = useSelector<AppRootStateType, string>(state => state.profilePage.MyStatus)
    const myProfile = useSelector<AppRootStateType, MyProfileType>(state => state.profilePage.MyProfile)
    const dispatch = useDispatch<AppDispatch>()


    const [profileTemp, setProfileTemp] = useState<MyProfileType>(myProfile)
    const [statusTemp, setStatusTemp] = useState(status)
    const [photo, setPhoto] = useState<{ url: string | null, blob: File | null }>({url: myProfile.photos.small, blob: null})
    const [popupData, setPopupData] = useState<PopupDataType>({isOpen: false, type: null, inputText: null, mode: null})

    let style = {background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'}


    const onChangePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPhoto({url: URL.createObjectURL(e.target.files[0]), blob: e.target.files[0]})
        }
    }

    const onClickSaveHandler = () => {
        dispatch(updateMyProfile(profileTemp, statusTemp, photo.blob))
    }

    const onClickCloseHandler = () => {
        closeModifyWindow()
    }
    console.log(profileTemp)

    let contacts = {
        [SocialEnum.INSTAGRAM]: InstagramIcon,
        [SocialEnum.GITHUB]: GitHubIcon,
        [SocialEnum.TWITTER]: TwitterIcon,
        [SocialEnum.YOUTUBE]: YouTubeIcon
    }

    /*const contacts:ContactType[] = [
        {
            link: profileTemp.contacts.instagram,
            mode: SocialEnum.INSTAGRAM,
            // style: style,
            // icon: InstagramIcon
        },
        {
            link: profileTemp.contacts.github,
            mode: SocialEnum.GITHUB,
            // style: {backgroundColor: 'black'},
            // icon: GitHubIcon
        },
        {
            link: profileTemp.contacts.twitter,
            mode: SocialEnum.TWITTER,
            // style: {backgroundColor: '#1778F2'},
            // icon: TwitterIcon
        },
        {
            link: profileTemp.contacts.youtube,
            mode: SocialEnum.YOUTUBE,
            // style: {backgroundColor: 'red'},
            // icon: YouTubeIcon
        }
    ]*/
    const getSocialLink = (value: string | null): string | null => {
        if(value === null) return null
        if (value.includes('https://')) {
            return value
        } else {
            return `https://www.${popupData.mode}.com/${value}`
        }
        return null
    }

    const Description = [
        {
            property: profileTemp.fullName, modeWord: 'fullName',
            text: 'Add your full name', icon: BadgeIcon, title: 'Full name'
        },
        {
            property: profileTemp.aboutMe, modeWord: 'aboutMe',
            text: 'Add information about you', icon: InfoIcon, title: 'About me'
        },
        {
            property: statusTemp, modeWord: 'status',
            text: 'Add your status', icon: DescriptionIcon, title: 'Status'
        },
        {
            property: profileTemp.lookingForAJobDescription, modeWord: 'lookingForAJobDescription',
            text: 'Add your job description', icon: HomeRepairServiceIcon, title: 'Job description'
        },
    ]
    const  onSaveTempHandler = (value: string | null) => {
        if(popupData.mode){
            if (popupData.type === 'contact'){
                popupData.mode && setProfileTemp({
                    ...profileTemp,
                    contacts: {
                        ...profileTemp.contacts,
                        [popupData.mode]: getSocialLink(value)
                    }
                })
                setPopupData({...popupData, isOpen: false})
            } else if (popupData.type === 'desc') {
                if (popupData.mode === 'status') {
                    setStatusTemp(value === null ? '' : value)
                } else {
                    setProfileTemp({
                        ...profileTemp,
                        contacts: {...profileTemp.contacts}, [popupData.mode]: value
                    })
                }
            }
        }
     }

    const setPopupDataHandler = (isOpen: boolean, type: PopupType | null, inputText: string | null, mode: string | null) => {
        setPopupData({isOpen, type, inputText, mode})
    }

    return <div className={s.ModifyWindow}>
        <Paper sx={{width: '60vh', height: '100%', position: 'relative'}}>
            <Paper className={s.ModifyWindowHeader}>
                <h2 style={{textAlign: 'center', marginLeft: '20px'}}>Modify profile</h2>
                <div>
                    <Button className={s.Button} onClick={onClickCloseHandler}>Cansel</Button>
                    <Button className={s.Button} sx={{margin: '0px 15px 0px 10px'}}
                            onClick={onClickSaveHandler}>Save</Button>
                </div>
            </Paper>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                marginTop: '10px'
            }}>
                <Avatar sx={{width: '120px', height: '120px', margin: '0 auto'}}
                        src={photo.url ? photo.url : ''}/>
                <label className={s.Label}>
                    <AddAPhotoIcon fontSize={'small'}
                                   sx={{position: 'relative', top: '6px', right: '1px', color: 'white'}}/>
                    <input type="file" id='image' onChange={onChangePhotoHandler} accept="image/*"
                           className={s.InputFile}/>
                </label>
                <h3 style={{margin: '-20px 0 10px 0'}}>
                    {profileTemp.fullName ? profileTemp.fullName.length >= 43 ? profileTemp.fullName.substring(0, 43) + '...' : profileTemp.fullName : 'No Name'}
                </h3>
            </div>
            <CircularProgress size={'50px'} color={'primary'}/>
            <div style={{marginLeft: '0px'}}>
                {Description.map(el => {
                    return <DescriptionBlock property={el.property}
                                             setValue={(obj => {
                                                      el.modeWord === 'status' ?
                                                          typeof obj === "string" && setStatusTemp(obj)
                                                          : typeof obj === "object" && setProfileTemp(obj)
                                                  })}
                                             icon={el.icon}
                                             title={el.title}
                                             text={el.text}
                                             modeWord={el.modeWord}
                                             profileTemp={profileTemp}
                    />
                })}
                <div>
                    <div className={s.AddIcon} style={{width: '100%', minHeight: '40px'}}>
                        <span className={s.SpanDescription}>
                                <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
                                <Avatar sx={{
                                    margin: '0 20px 0 0',
                                    width: '35px',
                                    height: '35px',
                                    backgroundColor: '#2C3E50'
                                }} className={s.AddIconScale}>
                                    <SearchIcon style={{
                                        backgroundColor: '#2C3E50',
                                        width: '23px',
                                        height: '23px',
                                        margin: '0 0 1px 0px'
                                    }}/>
                                </Avatar>
                                    <h5 style={{
                                        fontSize: '19px',
                                        fontWeight: '400',
                                        letterSpacing: '0.3px',
                                        whiteSpace: 'nowrap',
                                        margin: '0px'
                                    }}>Search job</h5>
                                </div>
                                <Switch sx={{marginRight: '5px'}} checked={profileTemp.lookingForAJob}
                                        onChange={(event, checked) => {
                                            profileTemp && setProfileTemp({
                                                ...profileTemp,
                                                contacts: {...profileTemp.contacts},
                                                lookingForAJob: checked
                                            })
                                        }}/>
                        </span>
                    </div>
                </div>
                <h3 style={{marginLeft: '10px'}}>Add social media</h3>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {Object.entries(profileTemp.contacts)
                        .filter(([key, value]) => Object.values(SocialEnum).some(el => key === el))
                        .map(([key, value]) => {
                            return <ContactsBlock
                                link={value}
                                mode={key}
                                setPopupDataHandler={setPopupDataHandler}
                            />
                        })}
                </div>
            </div>

            <ProfileDetailsEditPopup inputText={popupData.inputText}
                                     onSaveTempHandler={onSaveTempHandler}
                                     onClose={() => setPopupData({...popupData, isOpen: false})}
                                     isOpen={popupData.isOpen}
                                     type={popupData.type}

            />


        </Paper>
    </div>
};

export default ModifyProfilePopup;


