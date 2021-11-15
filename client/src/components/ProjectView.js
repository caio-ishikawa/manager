import { ClassNames } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import TextField from '@mui/material/TextField';
import { InputBase, Button, Avatar, Divider} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, Grid } from "@mui/material";
import ChatHeader from "./ChatHeader";
import io from 'socket.io-client';
import { useEffect, useState, useContext } from 'react';
import { UserEmailContext, CurrentServerContext } from "../global/contexts";
import def_profile from '../assets/def_profile.png';
import Axios from 'axios';
    
const socket = io.connect('http://localhost:3002/');

const ProjectView = () => {
    //console.log("SOCKET: ", socket)
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [allChat, setAllChat] = useState([]);
    const [addedUsername, setAddedUsername] = useState('');
    const [update, setUpdate] = useState(false);
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);
    let chatArr = [];

    // logs message in terminal //
    useEffect(() => {
        console.log('ran');
        socket.on("message", ({ message, email}) => {
            console.log({ message, email });
            //setAllChat({ ...allChat, [msg.email]: msg.message});
            setAllChat((_messages) => [ ..._messages, { email, message }])
        });
    },[]);
        
    // Joins test room //
    useEffect(() =>  {
        console.log("CLIENT SIDE HAS JOINED SERVER: ", currentServer);
        socket.emit("join", (currentServer ? currentServer : "test"));
    }, [currentServer]);

    // Sends hard coded message to room //
    const sendMessage = (e) => {
        console.log("SENDING MESSAGE: ", message);
        socket.emit('message', ({ message: message, email: globalEmail, room: currentServer }));
        e.preventDefault();
        setMessage('');
    };

    // Renders chat on display //
    const renderChat = () => {
        //console.log(allChat);
        return allChat.map((string, idx) => {
            return(
                <div>
                    <Grid container justify="center" spacing={-26}>
                        <Grid className={classes.pic} item sm={1.5} md={1.5} lg={1.5}>
                            <Avatar sx={{ height: "5vh", width: "5vh", marginBottom: "2vh", marginTop: "1.5vh"}} alt={string.email} src={def_profile}/>
                        </Grid>
                        <Grid item sm={10} md={9} lg={9}>
                            <p key={idx}>{string.email}</p>
                            <p key={idx}>{string.message}</p>
                        </Grid>
                    </Grid>
                    <hr color="#555562" className={classes.divider}/>
                </div>
            )
        })
    };


    return(
        <div className={classes.box}>
            <br></br>
            <p>PROJECT</p>
            <div className={classes.chat}>
                <Button onClick={(e) => sendMessage(e)}>test</Button>
                {allChat ? renderChat() : console.log('no chat')} 
            </div>
            <div className={classes.chatContainer}>
                <InputBase className={classes.chatInput} placeholder="Message #General" color="white" inputProps={{ style: {color: "white", margin: "0.5vh" }}} onChange={(e) => setMessage(e.target.value)} startAdornment={<IconButton><AddCircleIcon className={classes.icon}/></IconButton>}/>
            </div>
        </div>
    )

};
const useStyles = makeStyles({
    box: {
        margin: 0,
        padding: 0,
        height: "93.7vh",
        backgroundColor: "#393941",
        overflow: "hidden"
    },
    chat: {
        height: "78vh",
        borderWidth: "5px",
        borderBottomWidth: "1px",
        borderBottomColor: "#555562",
        borderBottomStyle: "solid",
        width: "95%",
        marginBottom: "3%",
        margin: "auto",
        overflowY: "auto",
    },
    chatContainer: {
        display: "flex",
        textAlign: "center"
    },
    chatInput: {
        backgroundColor: "#555562",
        borderRadius: 5,
        width: "90%",
        textAlign: "center",
        color: "white",
        margin: "auto",
    },
    input: {
        color: "white"
    },
    icon: {
        color: "#9292A0",
        marginRight: "1%"
    },
      '@global': {
    '*::-webkit-scrollbar': {
      width: '0.6em',
      borderRadius: "10px"
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.40)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.4)',
      outline: '1px solid slategrey',
      borderRadius: "10px"
    },
    pic: {
        borderRadius: "10%",
        overflow: "hidden",
        display: "block",
        alignItems: "center"
    },
    divider: {
        color: "black",
        width: "20%",
        margin: "0 auto"
    }
  }
});


export default ProjectView;
