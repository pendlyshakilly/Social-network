import React, {useState} from 'react';
import s from "../ModifyWindow.module.css";
import Avatar from "@mui/material/Avatar";
import InfoIcon from "@mui/icons-material/Info";
import {TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {MyProfileType} from "../../../../../State/Profile-reducer";

type AboutMePropsType = {
    myProfile: MyProfileType | null
}

const AddAboutMe = (props: AboutMePropsType) => {
    const [mode, setMode] = useState<string[]>([])
    const [profileDemo, setProfile] = useState<MyProfileType | null>(props.myProfile)

    return (
        <div>
            <h3>About me</h3>
            <div className={s.DescriptionPosition}>
                <Avatar sx={{margin: '0 5px 0 0'}}>
                    <InfoIcon/>
                </Avatar>
                {mode.some(i => i === 'About') ?
                    <TextField autoFocus={true} onChange={(e) => profileDemo && setProfile({
                        ...profileDemo,
                        contacts: {...profileDemo.contacts},
                        aboutMe: e.target.value
                    })} onBlur={() => setMode([])} id="outlined-basic" label="About me"
                               defaultValue={profileDemo && profileDemo.aboutMe} variant='outlined'/>
                    :
                    <div className={s.AddIcon}>
                        <AddIcon/>
                        {profileDemo && profileDemo.aboutMe ?
                            <span onDoubleClick={() => setMode(['About'])}>{profileDemo.aboutMe}</span> :
                            <span onClick={() => setMode(['About'])}>Add information about you</span>}
                    </div>
                }
            </div>
        </div>
    );
};

export default AddAboutMe;