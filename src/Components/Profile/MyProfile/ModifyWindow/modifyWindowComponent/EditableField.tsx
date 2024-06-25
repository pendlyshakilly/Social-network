import React, {useState} from 'react';
import s from './EditableField.module.css'
import Avatar from "@mui/material/Avatar";
import {Button, Dialog, Paper, SvgIconTypeMap, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from '@mui/icons-material/Done';
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {MyProfileType} from "../../../../../State/Profile-reducer";


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
    const [value, setValue] = useState<string>(`${props.property}`)

    const onClickHandler = (prop?: null) => {
        setMode([]);
        if (props.modeWord === 'status') {
            props.setValue(prop === null ? '' : value)
        } else {
            props.setValue({
                ...props.profileDemo,
                contacts: {...props.profileDemo.contacts}, [props.modeWord]: prop === null ? '' : value
            })
        }
    }

    return (
        <div>
            <div className={s.DescriptionPosition}>
                <Dialog transitionDuration={500} open={mode.some(i => i === props.modeWord)} onClose={() => setMode([])}
                        maxWidth={false}
                        style={{margin: '0 auto'}}>
                    <Paper sx={{width: '40vh', height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px'}}>
                        <div style={{width: '90%', height: '90%', marginLeft: '4%', display: 'flex',flexDirection: 'column', alignItems: 'start'}}>
                        <h3>{'Edit ' + props.title.toLowerCase()}</h3>
                        <TextField autoFocus={true} onChange={(e) =>{setValue(e.target.value)}}
                                   onKeyDown={event => {event.key === 'Enter' && value.trim() !== '' && onClickHandler()}}
                                   error={value.trim() === '' || props.property === null}
                                   unselectable={'on'}
                                   fullWidth
                                   inputProps={{style: {  fontSize: '18px'}}}
                                   id="outlined-basic" label={false}
                                   sx={{ width: '96%'}}
                                   defaultValue={props.property}
                                   variant={'standard'} hiddenLabel={true}/>

                        <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'end', alignItems: 'end'}}>
                            <Button sx={{margin: '0px 5px 10px 0px'}} onClick={() => setMode([])}>Cansel</Button>
                            <Button disabled={value.trim() === ''} sx={{margin: '0px 15px 10px 5px'}} onClick={() => onClickHandler()}>Save</Button>
                        </div>
                        </div>
                    </Paper>
                </Dialog>
                <div className={s.AddIcon} style={{width: '100%'}}>
                        <span className={s.SpanDescription} onClick={() => setMode([props.modeWord])}>
                                <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
                                <Avatar sx={{
                                    margin: '0 20px 0 0',
                                    width: '35px',
                                    height: '35px',
                                    backgroundColor: '#2C3E50'
                                }}>
                                    <props.icon style={{
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
                                        whiteSpace: 'nowrap'
                                    }}>{props.title}</h5>
                                </div>
                            {props.property ?
                                        <span style={{color: 'black', marginRight: '10px'}}>
                                    <span style={{
                                        margin: '0 5px 0 5px',
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        letterSpacing: '0.4px',
                                        color: '#005EE9'
                                    }}>{props.property.length >= 22 ? value.substring(0, 22) + '...' : props.property}</span>
                                </span>
                                        :
                                        <span style={{display: 'flex', alignItems: 'center', marginRight: '10px'}}>
                                            <span>{'Add'}</span>
                                            <AddIcon/>
                                        </span>}

                            </span>


                </div>
            </div>
        </div>
    );
};

export default EditableField;