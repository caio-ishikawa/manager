import { ClassNames } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import TextField from '@mui/material/TextField';
import { InputBase, Button, Avatar, Divider, Tooltip, Typography, Popover} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, Grid } from "@mui/material";
import ChatHeader from "./ChatHeader";
import io from 'socket.io-client';
import { useEffect, useState, useContext } from 'react';
import { UserEmailContext, CurrentServerContext, SocketContext } from "../global/contexts";
import def_profile from '../assets/def_profile.png';
import Axios from 'axios';
import { renderChat } from "../utils/renderChat";
import { renderOldChat } from '../utils/renderOldChat';
    

const ProjectView = (props) => {
    const socket = props.socket;
    console.log("SOCKET: ", socket)
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [allChat, setAllChat] = useState([]);
    const [addedUsername, setAddedUsername] = useState('');
    const [update, setUpdate] = useState(false);
    const [typing, setTyping] = useState(false);
    const [whoTyping, setWhoTyping] = useState('');
    const [serverMessages, setServerMessages] = useState([]);
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);
    const [file, setFile] = useState('');
    const [fileKey, setFileKey] = useState('');
    

    // Listens for socket events //
    useEffect(() => {
        socket.on("message", ({ message, email}) => {
            setAllChat((_messages) => [ ..._messages, { email, message }])
        });
        socket.on("typing", ({ email }) => {
            if (email != globalEmail) {
                setTyping(true);
                setWhoTyping(email);
            }
        });
        socket.on("stopped typing", ({ email }) => {
            setTyping(false);
        });
        socket.on("swap servers", (server_room) => {
            console.log("CLIENT SIDE HAS LEFT SERVER: ", server_room);
        });

        return () => { socket.off("message")};
    },[]);
    // -------------------------------- //
        

    // Joins desired server based on the currentServer context //
    useEffect(() =>  {
        setAllChat([]);
        socket.emit("swap servers", ({email: globalEmail}));
        console.log("CLIENT SIDE HAS JOINED SERVER: ", currentServer);
        socket.emit("join", ({roomName: currentServer ? currentServer : "placeholder", email: globalEmail}));

        // gets messages //
        Axios.post('http://localhost:3002/get/server_msgs', {server: currentServer})
            .then((res) => {
                setServerMessages(res.data)
            })
    }, [currentServer]);
    // -------------------------------- //


    // Sets message state based on user's input and emits typing event to socket //
    const userTyping = (e) => {
        setMessage(e.target.value);

        if (e.target.value.length > 0) {
            socket.emit("typing", ({ room: currentServer, email: globalEmail }));
        } else {
            socket.emit("stopped typing", ({ room: currentServer, email: globalEmail}));
            setTyping(false);
        }
    };
    // -------------------------------- //


    // Sends message to desired server //
    const sendMessage = (e) => {
        // Emits message to socket //
        console.log("SENDING MESSAGE: ", message);
        socket.emit('message', ({ message: message, email: globalEmail, room: currentServer }));
        socket.emit("stopped typing", ({ room: currentServer, email: globalEmail}));
        e.preventDefault();
        setMessage('');

        //Sends data to Chat model //
        let data = {
            email: globalEmail,
            server: currentServer,
            message: message
        };
        Axios.post('http://localhost:3002/post/chat', data)
            .then((res) => console.log(res));
    };
    // -------------------------------- //

    // POPOVER CONTROLS //
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined; 
    const openPopover = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const closePopover = () => {
        setAnchorEl(null);
    };
    // -------------------------------- //


    // Submits file to S3 bucket + its data to DB //
    const submitFile =  async() => {
        const fileData = new FormData();
        fileData.append('file', file)
        fileData.append('user', globalEmail);
        fileData.append('server', currentServer);

        const result = await Axios.post('http://localhost:3002/post/file', fileData , { headers: {'Content-Type': 'multipart/form-data'}});
        try {
            if (result.data.file_key != undefined) {
                console.log("FILE RESULT: ", result)
                let key = result.data.file_key;
                setAllChat((_messages) => [ ..._messages, { globalEmail, key}]);
                socket.emit("uploaded", ({ email: globalEmail, server: currentServer, fileName:result.data.name, fileKey: result.data.key}));
            }
        } catch (err) {
            console.log(err);
        }     
    };

    return(
        <div className={classes.box}>
            <br></br>
            <div className={classes.chat}>
                <Button onClick={(e) => sendMessage(e)}>test</Button>
                {serverMessages ? renderOldChat(serverMessages) : console.log('no old chat')}
                {allChat ? renderChat(allChat) : console.log('no chat')} 
            </div>
            {typing ?
                <Typography variant="body">{whoTyping} is typing...</Typography>
                :
                <p></p>
            }
            <div className={classes.chatContainer}>
             
                <InputBase className={classes.chatInput} placeholder="Message #General" color="white" inputProps={{ style: {color: "white", margin: "0.5vh" }}} value={message} onChange={(e) => userTyping(e)} startAdornment={<IconButton aria-describedby={id} onClick={(e) => openPopover(e)}><AddCircleIcon className={classes.icon}/></IconButton>}/>
            </div>

            {/* POPOVER  */}
            <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={closePopover}
            anchorOrigin={{
                vertical: -32,
                horizontal: 4 
            }}
            >
                <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                <Button onClick={() => submitFile()}>Submit</Button>
            </Popover>
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
        height: "83vh",
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
    },
    sentImg: {
        height: 10,
    }
  }
});


export default ProjectView;
