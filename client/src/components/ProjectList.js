import { makeStyles } from '@mui/styles';
import { Typography, Modal, Box, Button, Avatar, Tooltip, Grid,  TextField } from '@mui/material';
import Axios from 'axios';
import { useState, useContext, useEffect, useRef } from 'react';
import { UserEmailContext, CurrentServerContext } from '../global/contexts';
import serverIcon from '../assets/serverIcon.png';
import { Link } from 'react-router-dom';

const ProjectList = () => {
    const inputFile = useRef();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext); 
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);
    const [serverName, setServerName] = useState('');
    const [serverList, setServerList] = useState([]);
    const [file, setFile] = useState();

    // Retrieves all user's servers //
    useEffect(() => {
        let data = {
            email: globalEmail,
        };
        Axios.post('http://localhost:3002/get/servers', data)
            .then((res) => {
                console.log(res)
                setServerList(res.data);
            });
    }, []);

    // Changes server context //
    const swapServer = (content) => {
        console.log("SETTING SERVER TO: ", content)
        setCurrentServer(content);
    }; 

    // Opens and closes modal //        
    const handleModal = () => {
        setOpen(!open);
    };

    // Submits new server info to backend //
    const submitData = () => {
        // If user uploads server picture, post data to add_server, else send it to the add_server_picture endpoint, which uploads image to S3 bucket, and to server Schema //
        if (!file) {
            let data = {
                email: globalEmail,
                name: serverName
            };
            Axios.post('http://localhost:3002/post/add_server', data)
                //.then((res) => console.log(res));
        } else {
            let form = new FormData();
            form.append('file', file);
            form.append('email', globalEmail);
            form.append('server', serverName);

            Axios.post('http://localhost:3002/post/add_server_picture', form, { headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => console.log(res));
        }
    };

    const addPicture = () => {
        inputFile.current.click();
    };


    return (
        <div className={classes.box}>
            <br></br>
            <div className={classes.serverIcon}>
                <Link to="/profile">
                    <Tooltip title="PROFILE" placement="right">
                        <Avatar sx={{ width: "4.8vh", height: "4.8vh"}}>P</Avatar>
                    </Tooltip>
                </Link>
            </div>
            {serverList != "User not in any server" && typeof serverList != 'string'?
            serverList.map((content, idx) => (
                <div key={idx} className={classes.serverIcon} onClick={() => setCurrentServer(content.server)}>
                    <Tooltip key={idx} title={content.server} placement="right">
                        {content.pic ?
                        <Avatar key={idx} sx={{ width: "4.8vh", height: "4.8vh" }} src={"https://manager-io-app.s3.amazonaws.com/" + content.pic}></Avatar>
                        :
                            <Avatar key={idx} sx={{ width: "4.8vh", height: "4.8vh"}}>{content.server}</Avatar>
                        }
                    </Tooltip>
                </div>
                
            )) 
            :
            <p>no server</p>
            };
            <div onClick={() => handleModal()} className={classes.addProject}>
                <Avatar sx={{ width: "4.8vh", height: "4.8vh"}}>+</Avatar>
            </div>

            {/* MODAL */}

            <Modal
            open={open}
            onClose={handleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box className={classes.modal}>
                    <div className={classes.modalTitle}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ color: "#3872F5", marginTop: "1vh"}}>
                                    Customize your server 
                        </Typography>
                        <Typography variant="body" sx={{ marginLeft: "2vh", marginRight: "2vh", marginTop: "1vh", textAlign: "center", display: "flex", color: "#8E92A4"}}>
                            By creating a server, you will have access to free voice and text chat to use amongst your friends.
                        </Typography>
                    </div>
                    <Grid container>
                        <Grid item sm={7} md={7} lg={7}>
                            <TextField sx={{ marginTop: "2.9vh"}} variant="standard" size="small" placeholder="server name" onChange={(e) => setServerName(e.target.value)} className={classes.inputServerName}/>
                        </Grid>
                        <Grid item sm={5} md={5} lg={5}>
                            <span onClick={() => addPicture()} className={classes.circle}>
                                <img className={classes.plusIcon} src={serverIcon} height="30"/>
                            </span>
                        </Grid>
                    </Grid>
                    <div className={classes.footer}>
                        <Grid container spacing={0}>
                            <Grid item sm={7} md={7} lg={7}>
                                <div></div>
                            </Grid>
                            <Grid item sm={5} md={5} lg={5}>
                                <Button sx={{ backgroundColor: "#3872F5", marginLeft: "5vh"}} variant="contained" onClick={() => submitData()}>Create</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Modal>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} id="file" ref={inputFile} style={{ display: "none "}}/>
        </div>
    )
};

const useStyles = makeStyles({
    box: {
        margin: 0,
        padding: 0,
        height: "100vh",
        backgroundColor: "#131316",
    },
    icon: {
        height: "5.5vh",
        width: "5.5vh",
        borderWidth: 1,
        borderRadius: 100,
        borderColor: "white",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        cursor: "pointer"
    },
    projectName: {
        color: "purple",
        width: "60%",
        textAlign: "center"
    },
    addProject: {
        height: "5.5vh",
        width: "5.5vh",
        borderWidth: 1,
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        bottom: "20px",
        position: "absolute",
        marginLeft: "0.8vh"
    },
    addButton: {
        color: "white",
        width: "60%",
        textAlign: "center"
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: "31vh",
        backgroundColor: "white",
        textAlign: "center",
        borderRadius: "8px",
    },
    serverIcon: {
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        marginBottom: "2vh",
    },
    modalTitle: {
        marginBottom: "4vh"
    },
    circle: {
        height: "10vh",
        width: "10vh",
        backgroundColor: "#3872F5",
        border: "50px black",
        borderRadius: "50%",
        display: "inline-block",
        cursor: "pointer"
    },
    inputServerName: {
        marginTop: "6vh"
    },
    plusIcon: {
        display: "block",
        margin: "auto",
        marginTop: "3.3vh",
    },
    footer: {
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        height: "5vh",
        backgroundColor: "#DDDEE4",
        marginTop: "6vh",
        borderRadius: "10px",
        alignItems: "center",
        display: "flex"
    },
    footSep: {
        display: "flex",
        flex: 1
    }
});

export default ProjectList;