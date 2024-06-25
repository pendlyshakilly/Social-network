import React from 'react';
import {List, ListItem, ListItemAvatar, ListItemText, Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DescriptionIcon from "@mui/icons-material/Description";
import Divider from "@mui/material/Divider";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InfoIcon from '@mui/icons-material/Info';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../State/Store";
import {MyProfileType} from "../../../State/Profile-reducer";
import SearchIcon from "@mui/icons-material/Search";

type ContactType = {contact: 'facebook' | 'instagram' | 'twitter' | 'github' | 'youtube', style: {}, icon: any}


const DescriptionBlock = () => {
    let style = {
        background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
        cursor: 'pointer'
    }
    let myProfile = useSelector<AppRootStateType, MyProfileType>(state => state.profilePage.MyProfile)
    let status = useSelector<AppRootStateType, string>(state => state.profilePage.MyStatus)




    let description = [
        {property: myProfile.aboutMe, icon: InfoIcon, text: 'About Me'},
        {property: status, icon: DescriptionIcon, text: 'Add Status'},
        {property: myProfile.lookingForAJobDescription, icon: HomeRepairServiceIcon, text: 'Job description'}
    ]
    let contacts: ContactType[] = [
        {contact: 'instagram', style: style, icon: InstagramIcon},
        {contact: 'facebook', style: {backgroundColor: '#1778F2', cursor: 'pointer'}, icon: FacebookOutlinedIcon},
        {contact: 'twitter', style: {backgroundColor: 'white', cursor: 'pointer'}, icon: TwitterIcon},
        {contact: 'github', style: {backgroundColor: 'black', cursor: 'pointer'}, icon: GitHubIcon},
        {contact: 'youtube', style: {backgroundColor: 'white', cursor: 'pointer'}, icon: YouTubeIcon},
    ]
    myProfile.lookingForAJob && description.push({property: '', icon: SearchIcon, text: 'Search a job'})

    return (
        <Paper elevation={4} sx={{
            width: '100%',
            maxWidth: 360,
            backgroundColor: 'background.paper',
            paddingRight: '10px'
        }}>
            <List>
                {description.map(el => {
                    return <>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <el.icon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={el.text} sx={{color: 'black'}}
                                          secondaryTypographyProps={{color: 'black'}} secondary={el.property}/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </>
                })}
                <ListItem>
                    <h3 style={{marginBottom: '0px'}}>Social media:</h3>
                </ListItem>
                <ListItem>
                    {contacts.map((el: ContactType) => {
                        if(myProfile.contacts[el.contact]){
                        return <a href={myProfile.contacts[el.contact] ? `${myProfile.contacts[el.contact]}` : ''} target={'_blank'}>
                            <ListItemAvatar>
                                <Avatar style={el.style}>
                                    <el.icon fontSize={'medium'}/>
                                </Avatar>
                            </ListItemAvatar>
                        </a>
                        }
                        else{
                        return null
                        }})}
                </ListItem>
            </List>
        </Paper>
    );
};

export default DescriptionBlock;