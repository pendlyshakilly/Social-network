import React, {useState} from 'react';
import s from "../ModifyWindow.module.css";
import Avatar from "@mui/material/Avatar";
import {SvgIconTypeMap, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {MyProfileType} from "../../../../../State/Profile-reducer";
import ClearIcon from "@mui/icons-material/Clear";

type AddFullNamePropsType = {
    property: string | null,
    setValue: (object: MyProfileType | string) => void
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string }
    title: string,
    modeWord: string,
    text: string,
    profileDemo: MyProfileType
}

const EditableField = (props: AddFullNamePropsType) => {
    const [mode, setMode] = useState<string[]>([])
    const [value, setValue] = useState<string>('')
    const [property, setProperty] = useState(props.property)

    const onClickHandler = (prop?: null) => {
        setMode([]);
        if (props.modeWord === 'status') {
                props.setValue(prop === null ? '' : value)
        }
        else {
            props.setValue({
                ...props.profileDemo,
                contacts: {...props.profileDemo.contacts}, [props.modeWord]: prop === null ? null : value
            })
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div className={s.DescriptionPosition}>
                <Avatar sx={{margin: '0 5px 0 0'}}>
                    <props.icon/>
                </Avatar>
                {mode.some(i => i === props.modeWord) ?
                    <TextField autoFocus={true} onChange={(e) => setValue(e.target.value)}
                               onKeyDown={event => {
                                   event.key === 'Enter' && onClickHandler()
                               }}
                               onBlur={() => onClickHandler()}
                               id="outlined-basic" label={props.title}
                               defaultValue={value.trim() !== '' ? value : property}
                               variant='outlined'/>
                    :
                    <div className={s.AddIcon}>
                        {value.trim() !== '' ?
                            <a style={{color: 'black'}} onClick={() => setMode([props.modeWord])}>
                                <span style={{margin: '0 5px 0 5px', fontSize: '20px'}}>{value}</span>
                                <EditIcon/>
                            </a>
                            :
                            property ?
                                <a className={s.AddIcon} style={{color: 'black'}}>
                                    <a style={{color: 'black'}} onClick={() => setMode([props.modeWord])}>
                                    <span style={{
                                        margin: '0 10px 0 5px',
                                        fontSize: '20px'
                                    }}>{property}</span>
                                        <EditIcon sx={{marginRight: '10px'}} className={s.Avatar}/>
                                    </a>
                                    <ClearIcon className={s.Avatar} onClick={() => {
                                        setProperty(null)
                                        onClickHandler(null)
                                    }}/>
                                </a>
                                :
                                <a onClick={() => setMode([props.modeWord])}>
                                    <AddIcon/>
                                    <span>{props.text}</span>
                                </a>}
                    </div>
                }
            </div>
        </div>
    );
};

export default EditableField;