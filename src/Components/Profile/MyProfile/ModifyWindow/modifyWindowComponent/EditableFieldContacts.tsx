import React, {useState} from 'react';
import s from "../ModifyWindow.module.css";
import Avatar from "@mui/material/Avatar";
import {SvgIconTypeMap, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {MyProfileType} from "../../../../../State/Profile-reducer";

type EditableFieldContactsType = {
    property: any,
    modeWord: string
    style: {},
    setValue: (object: MyProfileType) => void
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string },
    profileDemo: MyProfileType
}

const EditableFieldContacts = (props: EditableFieldContactsType) => {
    const [mode, setMode] = useState<string[]>([])
    const [value, setValue] = useState<string>('')


    const onClickHandler = (prop?: null) => {
        setMode([])
        props.setValue({
            ...props.profileDemo,
            contacts: {
                ...props.profileDemo.contacts,
                [props.modeWord]: prop === null ? null : `https://www.${props.modeWord}.com/` + value
            }
        })
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', margin: '10px 0 10px 0', minHeight: '40px'}}>
            <Avatar style={props.style} sx={{marginRight: '5px'}}>
                <props.icon fontSize={'medium'}/>
            </Avatar>
            {mode.some(i => i === props.modeWord) ?
                <TextField autoFocus={true} onChange={(e) => setValue(e.target.value)}
                           onKeyDown={event => {
                               event.key === 'Enter' && onClickHandler()
                           }}
                           onBlur={() => onClickHandler()}
                           id="outlined-basic" label='Type your nickname'
                           defaultValue={value.trim() !== '' ? value : props.property && props.property.split('/')[3]}
                           variant='outlined'
                />
                :
                <div className={s.AddIcon}>
                    {value.trim() !== '' ?
                            <a style={{color: 'black'}} onClick={() => setMode([props.modeWord])}>
                                <span style={{
                                    margin: '0 5px 0 5px',
                                    fontSize: '20px',
                                    maxWidth: '90%',
                                    wordWrap: 'break-word'
                                }}>{value}</span>
                                <EditIcon className={s.Avatar}/>
                            </a>
                        :
                        props.property ?
                            <a style={{color: 'black'}} onClick={() => setMode([props.modeWord])}>
                                    <span style={{
                                        margin: '0 10px 0 5px',
                                        fontSize: '20px',
                                        maxWidth: '90%',
                                        wordWrap: 'break-word'
                                    }}>{props.property.split('/')[3]}</span>
                                <EditIcon sx={{marginRight: '10px'}} className={s.Avatar}/>
                            </a>
                            :
                            <a style={{display: 'flex'}} onClick={() => setMode([props.modeWord])}>
                                <AddIcon/>
                                <span>Add your profile</span>
                            </a>
                    }
                </div>
            }

        </div>
    );
};

export default EditableFieldContacts;