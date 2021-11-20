import { makeStyles } from "@mui/styles";
import { SocketContext } from "../global/contexts";
import { useContext, useEffect, useState } from 'react';
import { CurrentServerContext, UserEmailContext } from "../global/contexts";
import Axios from 'axios';
import { Typography } from "@mui/material";

const ActivityGrid = ( props ) => {
    const socket = props.socket;
    const classes = useStyles();
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    const [update, setUpdate] = useState('');
    const [allUpdates, setAllUpdates] = useState([]);


    return(
        <div className={classes.box}>
            <br></br>
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