import React, {useState} from 'react';
import s from "../ModifyWindow.module.css";
import Avatar from "@mui/material/Avatar";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import {TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {MyProfileType} from "../../../../../State/Profile-reducer";

type AddJobDescriptionType = {
    myProfile: MyProfileType | null
}

const AddJobDescription = (props: AddJobDescriptionType) => {
    const [mode, setMode] = useState<string[]>([])
    const [profileDemo, setProfile] = useState<MyProfileType | null>(props.myProfile)

    return (
        <div>
            <h3>Job description</h3>
            <div className={s.DescriptionPosition}>
                <Avatar sx={{margin: '0 5px 0 0'}}>
                    <HomeRepairServiceIcon/>
                </Avatar>
                {mode.some(i => i === 'job') ?
                    <TextField autoFocus={true} onChange={(e) => profileDemo && setProfile({
                        ...profileDemo,
                        contacts: {...profileDemo.contacts},
                        lookingForAJobDescription: e.target.value
                    })} onBlur={() => setMode([])} id="outlined-basic" label="Job"
                               defaultValue={''} variant='outlined'/>
                    :
                    <div className={s.AddIcon}>
                        <AddIcon/>
                        <span onClick={() => setMode(['job'])}>Add information about job</span>
                    </div>
                }
            </div>
        </div>
    );
};

export default AddJobDescription;