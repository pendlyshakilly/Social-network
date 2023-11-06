import React, {useState} from 'react';
import s from "../ModifyWindow.module.css";
import Avatar from "@mui/material/Avatar";
import DescriptionIcon from "@mui/icons-material/Description";
import {TextField} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../State/Store";

const AddStatus = () => {
    const status = useSelector<AppRootStateType, string>(state => state.profilePage.MyStatus)
    const [mode, setMode] = useState<string[]>([])

    return (
        <div>
            <h3>Status</h3>
            <div className={s.DescriptionPosition}>
                <Avatar sx={{margin: '0 5px 0 0'}}>
                    <DescriptionIcon/>
                </Avatar>
                {mode.some(i => i === 'status') ?
                    <TextField autoFocus={true}
                               onBlur={() => setMode([])} id="outlined-basic" label="Status"
                               defaultValue={status} variant='outlined'/>
                    :
                    <div className={s.AddIcon} style={status ? {color: 'black', fontSize: '20px'} : {}}
                         onClick={() => setMode(['status'])}>
                        {status ?
                            <>
                                <span style={{margin: ' 0 5px 0 5px'}}>{status}</span>
                                <EditIcon/>
                            </>
                            :
                            <>
                                <AddIcon/>
                                <span>Add status</span>
                            </>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default AddStatus;