import React from 'react';
import s from './MyProfile.module.css'
import Avatar from "@mui/material/Avatar";
import {Button, List, ListItem, ListItemAvatar, ListItemText, Paper} from "@mui/material";
import Divider from "@mui/material/Divider";
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import DescriptionIcon from '@mui/icons-material/Description';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

const MyProfile = () => {
    return (
        <div className={s.MyProfile}>
            <div className={s.BigImg}>
                <img src={''}/>
            </div>
            <div className={s.MyProfileContainer}>
                <div className={s.ContainerHeader}>
                    <div style={{display: "flex", alignItems: 'start'}}>
                        <div style={{width: '168px', height: '168px'}}>
                            <Avatar alt={'user'} sx={{width: '168px', height: '168px'}} className={s.Avatar}
                                    src={'https://scontent.fcdg1-1.fna.fbcdn.' +
                                        'net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=VTT51jsf8n4AX8Dfpoq&_nc_ht=scontent.fcdg1-1.fna&oh=00_AfBTQWSQ6Mg0xFV6eMUHhbbDd9517uMJKdo6E3_YdLYhrQ&oe=65620AF8'}/>
                        </div>
                        <div>
                            <h1 style={{marginTop: '-7px', marginLeft: '10px'}}>Ilia Pendlyshak</h1>
                        </div>
                    </div>
                    <div>
                        <Button variant={'contained'} sx={{borderRadius: '5px'}}>Modifier Profile</Button>
                    </div>
                </div>
                <div className={s.ContainerDescription}>
                    <Paper elevation={4} sx={{
                        width: '100%',
                        maxWidth: 360,
                        backgroundColor: 'background.paper',
                        paddingRight: '10px'
                    }}>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <WorkIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Work" secondary="Jan 7, 2014"/>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <BeachAccessIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Vacation" secondary="July 20, 2014"/>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <DescriptionIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Description" title={'sdfskjdfnsivzdughbdzufvbh'}/>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <ListItem>
                                <h3 style={{marginBottom: '0px'}}>Other social media:</h3>
                            </ListItem>
                            <ListItem>
                                <a href={'https://www.instagram.com/illia_3562'}>
                                    <ListItemAvatar>
                                        <Avatar className={s.Test}>
                                            <InstagramIcon fontSize={'medium'}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                </a>
                                <a href={'https://www.facebook.com/profile.php?id=61552232962671'}>
                                    <ListItemAvatar>
                                        <Avatar sx={{backgroundColor: '#1778F2', cursor: 'pointer'}}>
                                            <FacebookOutlinedIcon fontSize={'medium'}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                </a>
                                <a>
                                    <ListItemAvatar>
                                        <Avatar sx={{backgroundColor: 'white', cursor: 'pointer'}}>
                                            <TwitterIcon fontSize={'large'} sx={{color: '#1DA1F2'}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                </a>
                                <a href={'https://github.com/pendlyshakilly'}>
                                    <ListItemAvatar>
                                        <Avatar sx={{backgroundColor: 'black', cursor: 'pointer'}}>
                                            <GitHubIcon fontSize={'medium'}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                </a>
                                <a href={'https://www.youtube.com/channel/UCRy9VAFAigYO9KdOsVMI_aA'}>
                                    <ListItemAvatar>
                                        <Avatar sx={{backgroundColor: 'white', cursor: 'pointer'}}>
                                            <YouTubeIcon fontSize={'large'} sx={{color: 'red'}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                </a>
                            </ListItem>
                        </List>
                    </Paper>
                    <Paper elevation={4} className={s.FriendsContainer}>
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;