import { ClassNames } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import TextField from '@mui/material/TextField';
import { InputBase, Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from "@mui/material";
import ChatHeader from "./ChatHeader";
import io from 'socket.io-client';
import { useEffect, useState, useContext } from 'react';
import { UserEmailContext } from "../global/contexts";
    
const socket = io.connect('http://localhost:3002/');

const ProjectView = () => {
    //console.log("SOCKET: ", socket)
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [allChat, setAllChat] = useState([]);
    const [update, setUpdate] = useState(false);
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    console.log("GLOBAL EMAIL: ", globalEmail);
    let chatArr = [];

    // logs message in terminal //
    useEffect(() => {
        console.log('ran');
        socket.on("message", ({ message, email}) => {
            //setAllChat({ ...allChat, [msg.email]: msg.message});
            setAllChat((_messages) => [ ..._messages, { email, message }])
        });
    },[]);
        
    // Joins test room //
    useEffect(() =>  {
        socket.emit("join", ("test"));
    }, []);

    // Sends hard coded message to room //
    const sendMessage = (e) => {
        socket.emit('message', ({ message: message, email: globalEmail }));
        e.preventDefault();
        setMessage('');
    };

    const renderChat = () => {
        console.log(allChat);
        return allChat.map((string, idx) => {
            console.log(string.email);
            return(
                <div>
                    
                    <p key={idx}>{string.email}: {string.message}</p>
                </div>
            )
        })
    }

    return(
        <div className={classes.box}>
            <br></br>
            <p>PROJECT</p>
            <div className={classes.chat}>
                <p>test</p>
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
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.4)',
      outline: '1px solid slategrey'
    }
  }
});


export default ProjectView;
