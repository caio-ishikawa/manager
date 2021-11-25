import { makeStyles } from "@mui/styles";
import { InputBase, Button, Typography, Popover} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from "@mui/material";
import { useEffect, useState, useContext } from 'react';
import { UserEmailContext, CurrentServerContext, CurrentChannelContext } from "../global/contexts";
import Axios from 'axios';
import { renderChat } from "../utils/renderChat";
import { renderOldChat } from '../utils/renderOldChat';
    

const ProjectView = (props) => {
    const socket = props.socket;
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [allChat, setAllChat] = useState([]);
    const [update, setUpdate] = useState(false);
    const [typing, setTyping] = useState(false);
    const [whoTyping, setWhoTyping] = useState('');
    const [serverMessages, setServerMessages] = useState([]);
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);
    const [currentChannel, setCurrentChannel] = useContext(CurrentChannelContext);
    const [file, setFile] = useState('');
    const [profilePic, setProfilePic] = useState('');

    // Listens for socket events //
    useEffect(() => {
        let chatCount;
        let oldChatCount;
        socket.on("message", ({ message, email, pic }) => {
            console.log(message.length)
            setAllChat((_messages) => [..._messages, { email, message, pic }])
            chatCount = allChat.length
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
        

    // Joins desired server based on the currentServer context and gets all chat data from DB //
    useEffect(() =>  {
        setAllChat([]);
        socket.emit("swap servers", ({email: globalEmail}));
        console.log("CLIENT SIDE HAS JOINED SERVER: ", currentServer);
        socket.emit("join", ({roomName: currentChannel ? currentChannel: "placeholder", email: globalEmail}));

        // gets messages //
        Axios.get('http://localhost:3002/get/server_msgs', {params: {server: currentServer, channel: currentChannel}})
            .then((res) => {
                console.log("CHANNEL CHATS: ", res.data)
                setServerMessages(res.data)
            });
        
        // Gets user profile pic //
        Axios.get('http://localhost:3002/get/user_details', { params: { email: globalEmail }})
            .then((res) => {
                if (res.data.profile_picture) {
                    setProfilePic(res.data.profile_picture)
                } else {
                    setProfilePic(undefined);
                }
            })
    }, [currentServer, currentChannel]);
    // -------------------------------- //


    // Sets message state based on user's input and emits typing event to socket //
    const userTyping = (e) => {
        if (e.target.value.length > 0) {
            socket.emit("typing", ({ room: currentChannel, email: globalEmail }));
        } else {
            socket.emit("stopped typing", ({ room: currentChannel, email: globalEmail}));
            setTyping(false);
        }
    };
    // -------------------------------- //


    // Sends message to desired server //
    const sendMessage = (e) => {
        // Emits message to socket //
        socket.emit('message', ({ message: document.getElementById('input_base').value, email: globalEmail, room: currentChannel, pic: profilePic }));
        socket.emit("stopped typing", ({ room: currentChannel, email: globalEmail }));
        e.preventDefault();

        //Sends data to Chat model //
        let data = {
            email: globalEmail,
            server: currentServer,
            message: document.getElementById('input_base').value,
            pic: profilePic,
            channel: currentChannel 
        };
        Axios.post('http://localhost:3002/post/chat', data)
             .then((res) => {
                 console.log(res)
                 e.target.reset()
            });
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
        fileData.append('channel', currentChannel);

        const result = await Axios.post('http://localhost:3002/post/file', fileData , { headers: {'Content-Type': 'multipart/form-data'}});
        try {
            if (result.data.file_key !== undefined) {
                //console.log("FILE RESULT: ", result)
                let key = result.data.file_key;
                setAllChat((_messages) => [ ..._messages, { globalEmail, key}]);
                socket.emit("uploaded", ({ email: globalEmail, server: currentServer, fileName:result.data.name, fileKey: result.data.key, picture: profilePic }));
            }
        } catch (err) {
            console.log(err);
        }     
    };

    return(
        <div className={classes.box}>
            <br></br>
            <div className={classes.chat}>
                {serverMessages ? renderOldChat(serverMessages) : console.log('no old chat')}
                {allChat ? renderChat(allChat) : console.log('no chat')} 
            </div>
            {typing ?
                <Typography variant="body">{whoTyping} is typing...</Typography>
                :
                <p></p>
            }
            <div className={classes.chatContainer}>
                <form onSubmit={(e) => sendMessage(e)} style={{ width: "100%"}}>
                <InputBase id="input_base" className={classes.chatInput} placeholder="Message #General" color="white" inputProps={{ style: {color: "white", margin: "0.5vh" }}}  onChange={(e) => userTyping(e)} startAdornment={<IconButton aria-describedby={id} onClick={(e) => openPopover(e)}><AddCircleIcon className={classes.icon}/></IconButton>}/>
                </form>
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
