import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import ProjectList from '../components/ProjectList';
import ProjectView from '../components/ProjectView';
import ChannelView from '../components/ChannelView';
import ActivityGrid from '../components/ActivityView';
import ChatHeader from '../components/ChatHeader';
import ActivityViewHeader from '../components/ActivityViewHeader';
import ChannelViewHeader from '../components/ChannelViewHeader';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserEmailContext, CurrentServerContext, VideoContext } from '../global/contexts';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3002/');

const Main = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);

    // Video context defines what screen should be showing (video or chat) //
    const [video, setVideo] = useContext(VideoContext);
    // -------------------------------- //

    // Re-renders after video context updates //
    useEffect(() => {
        console.log(video);
    }, [video])
    

    return(
        <div className={classes.root}>
            <Grid className={classes.root} container spacing={0}>
                <Grid item className={classes.root} item sm={1} md={0.6} lg={0.6}>
                    <ProjectList/> 
                </Grid>
                <Grid item sm={2} md={2.6} lg={2.3}>
                    <ActivityViewHeader/>
                    <ActivityGrid socket={socket}/>
                </Grid>
                <Grid item sm={7} md={6.5} lg={6.9}>
                    <ChatHeader socket={socket}/>
                    <ProjectView socket={socket}/> 
                </Grid>
                <Grid item sm={2} md={2.3} lg={2.2}>
                    <ChannelViewHeader/>
                    <ChannelView socket={socket}/>
                </Grid>
            </Grid>
        </div>
    )
};


const useStyles = makeStyles({
    root:{
        color:"white"
    }
})


export default Main


