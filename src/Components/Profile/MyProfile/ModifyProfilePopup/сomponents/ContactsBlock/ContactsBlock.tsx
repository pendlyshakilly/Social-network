import React, {useState} from 'react';
import s from "./ContactsBlock.module.css";
import Avatar from "@mui/material/Avatar";
import {Dialog, Icon, Paper, SvgIconTypeMap} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {MyProfileType} from "../../../../../../State/Profile-reducer";
import TextFieldCustom from "../ProfileDetailsEditPopup/ProfileDetailsEditPopup";
import {PopupType, SocialEnum} from "../../ModifyProfilePopup";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";


type EditableFieldContactsType = {
    link: string | null,
    mode: string
    setPopupDataHandler: (isOpen: boolean, type: PopupType | null, inputText: string | null, mode: string | null) => void
    // style: {},
    // icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string },
}

type contactsType = {
    [key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
}

const ContactsBlock = (props: EditableFieldContactsType) => {

    let contacts: contactsType = {
        'instagram': InstagramIcon,
        'github': GitHubIcon,
        'twitter': TwitterIcon,
        'youtube': YouTubeIcon
    }


    return (
        <div>
            <div className={s.AddContactsBlock}
                 onClick={() => props.setPopupDataHandler(true, 'contact', props.link, props.mode)}>
                <Avatar
                    className={s.AddIconScale}
                    sx={{margin: '0 10px 0 10px', backgroundColor: '#2C3E50'}}>
                    <Icon fontSize={'medium'} component={contacts[props.mode]}/>
                </Avatar>
                {props.link ?
                    <a style={{color: 'black'}}>
                                    <span style={{
                                        margin: '0 10px 0 5px',
                                        fontSize: '20px',
                                        maxWidth: '90%',
                                        wordWrap: 'break-word'
                                    }}>
                                        {props.link.includes('https://') ?
                                            (props.link.split('/')[3] !== undefined ?
                                                props.link.split('/')[3] : props.link) : props.link}</span>

                    </a> :
                    <a style={{display: 'flex', transition: 'all 1s'}}>
                        <AddIcon/>
                        <span>Add</span>
                    </a>
                }
            </div>
        </div>
    );
};

export default ContactsBlock;