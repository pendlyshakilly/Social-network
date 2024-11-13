import React, {ChangeEvent, useState} from 'react';
import {Backdrop, Button, ButtonOwnProps, Paper, Switch} from "@mui/material";
import s from './ModifyProfilePopup.module.css'
import Avatar from "@mui/material/Avatar";
import SearchIcon from '@mui/icons-material/Search';
import {MyProfileType, updateMyProfile} from "../../../../State/Profile-reducer";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../../State/Store";
import DescriptionBlock from "./сomponents/DescriptionBlock/DescriptionBlock";
import ContactsBlock from "./сomponents/ContactsBlock/ContactsBlock";
import CircularProgress from '@mui/material/CircularProgress';
import ProfileDetailsEditPopup from "./сomponents/ProfileDetailsEditPopup/ProfileDetailsEditPopup";
import LinearProgress from '@mui/material/LinearProgress';

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

export enum DescriptionEnum {
    FULLNAME = 'fullName',
    ABOUTME = 'aboutMe',
    LOOKINGFORAJOBDESC = 'lookingForAJobDescription'
}

export type PopupType = 'desc' | 'contact'

const ModifyProfilePopup = ({closeModifyWindow}: ModifyWindowPropsType) => {
    const status = useSelector<AppRootStateType, string>(state => state.profilePage.MyStatus)
    const myProfile = useSelector<AppRootStateType, MyProfileType>(state => state.profilePage.MyProfile)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.initialized.isLoading)
    const dispatch = useDispatch<AppDispatch>()


    const [profileTemp, setProfileTemp] = useState<MyProfileType>(myProfile)
    const [statusTemp, setStatusTemp] = useState(status)
    const [photo, setPhoto] = useState<{ url: string | null, blob: File | null }>({
        url: myProfile.photos.small,
        blob: null
    })
    const [popupData, setPopupData] = useState<PopupDataType>({isOpen: false, type: null, inputText: null, mode: null})


    const onChangePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPhoto({url: URL.createObjectURL(e.target.files[0]), blob: e.target.files[0]})
        }
    }

    const onClickSaveHandler = () => {
        dispatch(updateMyProfile(profileTemp, statusTemp, photo.blob))
    }


    const getSocialLink = (value: string | null): string | null => {
        if (value === null) return null
        if (value.includes('https://')) {
            return value
        } else {
            return `https://www.${popupData.mode}.com/${value}`
        }
        return null
    }


    const onSaveTempHandler = (value: string | null) => {
        if (popupData.mode) {
            if (popupData.type === 'contact') {
                popupData.mode && setProfileTemp({
                    ...profileTemp,
                    contacts: {
                        ...profileTemp.contacts,
                        [popupData.mode]: getSocialLink(value)
                    }
                })
                setPopupData({isOpen: false, type: null, inputText: null, mode: null})
            } else if (popupData.type === 'desc') {
                if (popupData.mode === 'status') {
                    setStatusTemp(value === null ? '' : value)
                    setPopupData({...popupData, isOpen: false})
                } else {
                    setProfileTemp({
                        ...profileTemp,
                        contacts: {...profileTemp.contacts}, [popupData.mode]: value
                    })
                    setPopupData({isOpen: false, type: null, inputText: null, mode: null})
                }
            }
        }
    }


    const setPopupDataHandler = (isOpen: boolean, type: PopupType | null, inputText: string | null, mode: string | null) => {
        setPopupData({isOpen, type, inputText, mode})
    }


    return <div className={s.ModifyWindow}>
        <Paper sx={{width: '60vh', height: '100%', position: 'relative'}}>
            {isLoading && <Backdrop
                sx={{width: '100%', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={true}>
                <CircularProgress color="inherit"/>
            </Backdrop>}
            <Paper className={s.ModifyWindowHeader}>
                <div className={s.ModifyWindowHeaderContainer}>
                    <h2 style={{textAlign: 'center', marginLeft: '20px'}}>Modify profile</h2>
                    <div>
                        <Button  className={s.Button} disabled={isLoading}
                                onClick={() => closeModifyWindow()}>Cansel</Button>
                        <Button className={s.Button} disabled={isLoading} sx={{margin: '0px 15px 0px 10px'}}
                                onClick={onClickSaveHandler}>Save</Button>
                    </div>
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

            {/*<CircularProgress size={'50px'} color={'primary'} sx={{position: 'absolute', zIndex: '5', left: '40%'}}/>*/}
            <div>
                {
                    [...Object.entries(profileTemp).filter(([key, value]) => Object.values(DescriptionEnum).some(el => el === key)), ['status', `${statusTemp}`]].map(([key, value]) => {
                        return <DescriptionBlock value={value}
                                                 setPopupDataHandler={setPopupDataHandler}
                                                 mode={key}
                        />
                    })
                }
                <div>
                    <div className={s.AddIcon} style={{width: '100%', minHeight: '40px'}}>
                        <span className={s.SpanDescription}>
                                <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
                                <Avatar sx={{backgroundColor: '#2C3E50'}} className={s.AddIconScale}>
                                    <SearchIcon style={{
                                        color: 'white',
                                        width: '23px',
                                        height: '23px',
                                        margin: '0px'
                                    }}
                                                fontSize={'medium'}
                                    />
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


