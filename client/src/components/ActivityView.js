import { makeStyles } from "@mui/styles";
import { SocketContext } from "../global/contexts";
import { useContext, useEffect, useState } from 'react';
import { CurrentServerContext } from "../global/contexts";
import Axios from 'axios';
import { Typography } from "@mui/material";

const ActivityGrid = ( props ) => {
    const socket = props.socket;
    const classes = useStyles();
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);
    const [update, setUpdate] = useState('');
    const [allUpdates, setAllUpdates] = useState([]);

    // Listens for updates //
    useEffect(() => {
        socket.on("added", ( email ) => {
            setUpdate(email.email + ' has joined the server.');
        });
        Axios.post('http://localhost:3002/get/updates', { server: currentServer })
            .then((res) => setAllUpdates(res.data));
    },[currentServer]);

    // Posts update to DB //
    useEffect(() => {
        if (update != "") {
            let data = {
                server: currentServer,
                update: update
            };
            Axios.post("http://localhost:3002/post/update", data)
                .then((res) => console.log(res));
        } else {
            console.log("NO UPDATES");
        }
    }, [update])

    const renderUpdates = () => {
        return allUpdates.map((upd, idx) => {
            return(
                <div>
                    <div className={classes.updateDiv} id={idx}>
                        <Typography className={classes.updates} variant="body">{upd}</Typography>
                    </div>
                    <hr color="#27282B" className={classes.divider}/>
                </div>
            )
        })
    }

    return(
        <div className={classes.box}>
            <br></br>
            <Typography className={classes.title} variant="h5">Activity</Typography>
            {allUpdates != "No updates" && typeof allUpdates != 'string' ? 
            renderUpdates()
            :
            <p>NO UPDATES YET</p>
            }
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