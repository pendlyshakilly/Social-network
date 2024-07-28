import React, {useState} from 'react';
import s from './DescriptionBlock.module.css'
import Avatar from "@mui/material/Avatar";
import {Dialog, Paper, SvgIconTypeMap} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {MyProfileType} from "../../../../../../State/Profile-reducer";
import TextFieldCustom from "../ProfileDetailsEditPopup/ProfileDetailsEditPopup";


type AddFullNamePropsType = {
    property: string | null
    setValue: (object: MyProfileType | string) => void
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string }
    title: string,
    modeWord: string,
    text: string,
    profileTemp: MyProfileType
}

const DescriptionBlock = (props: AddFullNamePropsType) => {
  /*  const [isEditMode, setIsEditMode] = useState(false)

    const onClickHandler = (value: string | null) => {
        setIsEditMode(false);

        if (props.modeWord === 'status') {
            props.setValue(value === null ? '' : value)
        } else {
            props.setValue({
                ...props.profileTemp,
                contacts: {...props.profileTemp.contacts}, [props.modeWord]: value === 'null' ? '' : value
            })
        }
    }*/

    return (
        <div>
            <div className={s.DescriptionPosition}>
                {/*<Dialog transitionDuration={500}
                        open={isEditMode}
                        maxWidth={false}
                        style={{margin: '0 auto'}}>
                    <Paper sx={{
                        width: '40vh',
                        height: '30vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '5px'
                    }}>
                        <div style={{
                            width: '90%',
                            height: '90%',
                            marginLeft: '4%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start'
                        }}>
                            <h3>{'Edit ' + props.title.toLowerCase()}</h3>

                            <TextFieldCustom modeWord={props.modeWord} property={props.property} onSaveHandler={onClickHandler} setMode={setIsEditMode} type="desc"/>
                        </div>
                    </Paper>
                </Dialog>*/}
                <div className={s.AddIcon} style={{width: '100%'}}>
                        <span className={s.SpanDescription} >
                                <div
                                    style={{display: 'flex', alignItems: 'center', marginLeft: '10px', height: '50px'}}>
                                <Avatar sx={{
                                    margin: '0 20px 0 0',
                                    width: '35px',
                                    height: '35px',
                                    backgroundColor: '#2C3E50'
                                }} className={s.AddIconScale}>
                                    <props.icon style={{
                                        backgroundColor: '#2C3E50',
                                        width: '23px',
                                        height: '23px',
                                        margin: '0px'
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
                                        color: '#1976d2'
                                    }}>{props.property.length >= 22 ? props.property.substring(0, 22) + '...' : props.property}</span>
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

export default DescriptionBlock;