import { makeStyles } from "@mui/styles";
import { Button, Modal, Grid, Box, Typography, InputBase } from "@mui/material";
import { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { UserEmailContext, CurrentServerContext, CurrentChannelContext} from '../global/contexts';

const ActivityGrid = ( props ) => {
    const classes = useStyles();
    const [channels, setChannels] = useState([]);
    const [open, setOpen] = useState(false);
    const [newChannel, setNewChannel] = useState('');
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);
    const [currentChannel, setCurrentChannel] = useContext(CurrentChannelContext);
    const socket = props.socket;

    // Sets the channel list state when user changes server //
    useEffect(() => {
        Axios.post("http://localhost:3002/get/channels", {server: currentServer})
            .then((res) => setChannels(res.data));
    },[currentServer]);

    // Changes channel context when user clicks on different channel //
    const changeChannel = (channel) => {
        let channelID = channel + currentServer;
        console.log(channelID);
        setCurrentChannel(channelID);
        socket.emit("join channel", ({ channel: channelID, email: globalEmail}));
    };

    // Listens for Joined Channel event // 
    useEffect(() => {
        socket.on("joined channel", ({ channel }) => {
            console.log("Channel: ", channel);
        })
    },[]);

    const handleModal = () => {
        setOpen(!open);
    };

    const submitData = () => {
        let data = {
            server: currentServer,
            channel: newChannel
        };
        Axios.post('http://localhost:3002/post/add_channel', data)
            .then((res) => {console.log(res)});
    };

    return(
        <div className={classes.box}>
            <br></br>
            <Button variant="text" onClick={() => handleModal()}>Add Channel</Button>
            {channels ?
            channels.map((chan, idx) => (
                <div key={idx}>
                    <Button sx={{ color: "white" }} onClick={() => changeChannel(chan)} variant="text">#{chan}</Button>
                </div>
            ))
            :
            <p>No channels yet</p>
            }

            {/* MODAL */}
            <Modal
            open={open}
            onClose={() => handleModal()}
            aria-labelledby="modal"
            aria-describedby="add_channel"
            >
                <Box className={classes.modal}>
                    <Typography sx={{ color: "white", marginBottom: "2vh" }} variant="h6">Create Text Channel</Typography>
                    <InputBase onChange={(e) => setNewChannel(e.target.value)} id="input_base" className={classes.chatInput} placeholder="Channel name" color="white" inputProps={{ style: {color: "white", margin: "0.5vh" }}}/>
                    <div className={classes.footer}>
                        <Grid container spacing={0}>
                            <Grid item sm={7} md={7} lg={7}>
                                <div></div>
                            </Grid>
                            <Grid item sm={5} md={5} lg={5}>
                                <Button sx={{ backgroundColor: "#3872F5", marginLeft: "5vh"}} onClick={() => submitData()} variant="contained" >Create</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Modal>
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
    },
    chatInput: {
        backgroundColor: "#555562",
        borderRadius: 5,
        width: "70%",
        textAlign: "center",
        color: "white",
        margin: "auto",
        marginBottom: "2vh"
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: "15vh",
        boxShadow: 24,
        p: 4,
        backgroundColor: "#393941",
        borderRadius: "7px",
        textAlign: "center"
    },
    footer: {
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        height: "5vh",
        marginTop: "6vh",
        borderRadius: "10px",
        alignItems: "center",
        display: "flex",
        marginTop: "2vh"
    },
})


export default ActivityGrid;