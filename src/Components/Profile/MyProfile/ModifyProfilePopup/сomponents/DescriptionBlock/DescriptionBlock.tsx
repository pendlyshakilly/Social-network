import React from 'react';
import s from './DescriptionBlock.module.css'
import Avatar from "@mui/material/Avatar";
import {Icon, SvgIconTypeMap} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import BadgeIcon from "@mui/icons-material/Badge";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import {PopupType} from "../../ModifyProfilePopup";


type AddFullNamePropsType = {
    value: any
    setPopupDataHandler: (isOpen: boolean, type: PopupType | null, inputText: string | null, mode: string | null) => void
    mode: string,
}


type descriptionDataType = {
    icons: {
        [key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
    },
    text: {
        [key: string]: string
    }
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

    const descriptionData: descriptionDataType = {
        icons: {
            'fullName': BadgeIcon,
            'aboutMe': InfoIcon,
            'status': DescriptionIcon,
            'lookingForAJobDescription': HomeRepairServiceIcon
        },
        text: {
            'fullName': 'Full name',
            'aboutMe': 'About me',
            'status': 'Status',
            'lookingForAJobDescription': 'Job description'
        }
    }



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
                <div className={s.AddIcon} style={{width: '100%'}} onClick={() => props.setPopupDataHandler(true, 'desc', props.value, props.mode)}>
                        <span className={s.SpanDescription}>
                                <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px', height: '50px'}}>
                                <Avatar className={s.AddIconScale} sx={{backgroundColor: '#2C3E50 '}}>
                                    <Icon component={descriptionData.icons[props.mode]} style={{
                                        color: 'white',
                                        width: '23px',
                                        height: '23px',
                                        margin: '0px'
                                    }} fontSize={'medium'}/>
                                </Avatar>
                                    <h5 style={{
                                        fontSize: '19px',
                                        fontWeight: '400',
                                        letterSpacing: '0.3px',
                                        whiteSpace: 'nowrap'
                                    }}>{descriptionData.text[props.mode]}</h5>
                                </div>
                            {props.value ?
                                <span style={{color: 'black', marginRight: '10px'}}>
                                    <span style={{
                                        margin: '0 5px 0 5px',
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        letterSpacing: '0.4px',
                                        color: '#1976d2'
                                    }}>{props.value.length >= 22 ? props.value.substring(0, 22) + '...' : props.value}</span>
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