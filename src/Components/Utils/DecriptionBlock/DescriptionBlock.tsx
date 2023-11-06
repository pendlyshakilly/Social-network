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

const DescriptionBlock = () => {
    let style = {
        background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
        cursor: 'pointer'
    }

    return (
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
                            <InfoIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="About Me" sx={{color: 'black'}}
                                  secondaryTypographyProps={{color: 'black'}} secondary="célibataire"/>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <DescriptionIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="AddStatus" sx={{color: 'black'}}
                                  secondaryTypographyProps={{color: 'black'}} secondary="Hijbi228"/>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <HomeRepairServiceIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Work" secondaryTypographyProps={{color: 'black'}}
                                  secondary="I found the job, and i am good man and cool software ingeniere"/>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem>
                    <h3 style={{marginBottom: '0px'}}>Other social media:</h3>
                </ListItem>
                <ListItem>
                    <a href={'https://www.instagram.com/illia_3562'}>
                        <ListItemAvatar>
                            <Avatar style={style}>
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
    );
};

export default DescriptionBlock;