// VOICE CHAT COMPONENT //
import { makeStyles } from "@mui/styles";
import Axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { CurrentServerContext, UserEmailContext, VideoContext } from '../global/contexts';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ActivityGrid = ( props ) => {
    const socket = props.socket;
    const classes = useStyles();
    const [channels, setChannels] = useState([]);
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    const [video, setVideo] = useContext(VideoContext);


    return(
        <div className={classes.box}>
            <br></br>
            <Link to="/video">
                <Button variant="text" sx={{ color: "white"}}>#General</Button>
            </Link>
           
           <Link to="/main">LEAVE CALL</Link>
        </div>
    )
};

const useStyles = makeStyles({
    box: {
        margin: 0,
        padding: 0,
        height: "93.7vh",
        backgroundColor: "#1C1C21",
    },
    divider: {
        width: "90%",
        marginTop: "2vh",
        marginBottom: "2vh"
    },
    updates: {
        color: "#C9CBCF",
    },
    updateDiv: {
        width: "90%",
        margin: "auto",
    },
    title: {
        textAlign: "center"
    }
})


export default ActivityGrid;