import React, {useState} from 'react';
import s from "../ModifyWindow.module.css";
import Avatar from "@mui/material/Avatar";
import BadgeIcon from "@mui/icons-material/Badge";
import {TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {MyProfileType} from "../../../../../State/Profile-reducer";

type AddFullNamePropsType = {
    myProfile: MyProfileType | null
}

const AddFullName = (props: AddFullNamePropsType) => {
    const [mode, setMode] = useState<string[]>([])
    const [profileDemo, setProfile] = useState<MyProfileType | null>(props.myProfile)

    return (
        <div>
            <h3>Full name</h3>
            <div className={s.DescriptionPosition}>
                <Avatar sx={{margin: '0 5px 0 0'}}>
                    <BadgeIcon/>
                </Avatar>
                {mode.some(i => i === 'fullName') ?
                    <TextField autoFocus={true} onChange={(e) => profileDemo && setProfile({
                        ...profileDemo,
                        contacts: {...profileDemo.contacts},
                        fullName: e.target.value
                    })} onBlur={() => setMode([])} id="outlined-basic" label="Full name"
                               defaultValue={profileDemo && profileDemo.aboutMe} variant='outlined'/>
                    :
                    <div className={s.AddIcon} onClick={() => setMode(['fullName'])}>
                        <AddIcon/>
                        <span>Add information about you</span>
                    </div>
                }
            </div>
        </div>
    );
};

export default AddFullName;