import { makeStyles } from "@mui/styles";
import { useEffect, useState, useContext } from 'react';
import { UserEmailContext, CurrentServerContext, SocketContext } from "../global/contexts";
import Axios from 'axios';
import { Typography, Avatar, Grid, Stack } from "@mui/material";
import def_profile from '../assets/def_profile.png';
import OnlineAvatar from "./OnlineAvatar";

const ChannelView = (props) => {
    const socket = props.socket;
    const classes = useStyles();
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    const [allMembers, setAllMembers] = useState([]);
    const [onlineMembers, setOnlineMembers] = useState([]);
    var online = [];

    useEffect(() => {
        if (currentServer) {
            console.log({currentServer, globalEmail})
            let data = {
                email: globalEmail,
                server: currentServer 
            };
            Axios.post('http://localhost:3002/get/all_members', data)
                .then((res) => setAllMembers(res.data));
        }
    }, [currentServer])

    useEffect(() => {
        setOnlineMembers([]);
        online = [];
        socket.on("join", ({ email }) => {
            console.log(email, "is now online")
            if (!online.includes(email)) {
                online.push(email);
                setOnlineMembers(online);
            }
        });

        socket.on("user left", (user) => {
            console.log("CLIENT SIDE DISCONNECTING");
            if (online.includes(user)) {
                let index = online.indexOf(user);
                online.splice(index, 1);
                console.log("ONLINE ARRAY: ", online);
                setOnlineMembers(online);
            }
        })
    },[]);




    return(
        <div className={classes.box}>
            <br></br>
            <Typography className={classes.title} variant="h5">Users</Typography>
            <div className={classes.users}>
                { allMembers ?
                allMembers.map((name, idx) => (
                    <div className={classes.userView}>
                        <Grid container spacing={0}>
                            <Grid item sm={3} md={2} lg={2}>
                                {onlineMembers.length > 0 && onlineMembers.includes(name) ? 
                                <OnlineAvatar picture={def_profile}/>
                                :
                                <Avatar src={def_profile} sx={{ height: "3vh", width: "3vh", marginBottom: "2vh" }}/>
                                }
                            </Grid>
                            <Grid item sm={9} md={10} lg={10}>
                                <Typography key={idx}>{name}</Typography>
                            </Grid>
                        </Grid>
                    </div>
                ))
                :
                <Typography>No members in this server</Typography>
                }
            </div>
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
    userView: {
        width: "90%",
        margin: "auto"
    },
    title: {
        textAlign: "center",
        marginBottom: "2vh"
    },
    users: {
        marginTop: "2vh"
    }
});


export default ChannelView;