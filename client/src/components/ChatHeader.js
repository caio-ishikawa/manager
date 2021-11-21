import { Typography, Toolbar, AppBar, Box, IconButton, Popover, InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState, useContext } from 'react';
import Axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CurrentServerContext, UserEmailContext } from "../global/contexts";

const ChatHeader = (props) => {
    const socket = props.socket;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [addedUser, setAddedUser] = useState('');
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);
    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;

    const handlePopover = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const closePopover = () => {
        setAnchorEl(null);
    };

    const addUser = () => {
        if (addedUser) {
            let data = {
                email: addedUser,
                server: currentServer
            };
            Axios.post('http://localhost:3002/post/add_user', data)
                .then((res) => {
                    if (res.data === "User added") {
                        socket.emit("added", ({ room: currentServer, email: addedUser}));
                    }
                });
        } else {
            alert("Please write the user's email.")
        }
    };

    return(
        <div>
            <Box sx={{ flexGrow: 1, width: "100%"}}>
                <AppBar className={classes.bar} sx={{ backgroundColor: "#393941"}} position="relative" elevation={2}>
                    <Toolbar>
                        <Typography style={{ flex: 1}}>{currentServer ? currentServer : "NO SERVER"}</Typography>
                        <Link sx={{ flex: 1 }} to="/">Test</Link>
                        <IconButton onClick={(e) => handlePopover(e)} aria-describedby={id}>
                            <PersonAddIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>

            {/* POPOVER */}
            <Popover
            className={classes.popover}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={closePopover}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            PaperProps={{ style: { width: "30vh" }}}
            elevation={3}
            >
                <InputBase className={classes.chatInput} placeholder="Add: user@email.com" color="white" inputProps={{ style: {color: "white", margin: "0.5vh" }}} endAdornment={<IconButton onClick={() => addUser()}><AddCircleIcon className={classes.icon}/></IconButton>} onChange={(e) => setAddedUser(e.target.value)}/>
            </Popover>
        </div>
    )
};


const useStyles = makeStyles({
    bar: {
        minHeight: 20 
    },
    chatInput: {
        backgroundColor: "#555562",
        width: "100%",
        textAlign: "center",
        color: "white",
        margin: "auto",
    },
    icon: {
        color: "#9292A0",
        marginRight: "1%"
    },
})


export default ChatHeader;