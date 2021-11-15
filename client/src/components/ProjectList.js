import { makeStyles } from '@mui/styles';
import { Typography, Modal, Box, Button } from '@mui/material';
import Axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { UserEmailContext, CurrentServerContext } from '../global/contexts';

const ProjectList = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext); 
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);
    const [serverName, setServerName] = useState('');
    const [serverList, setServerList] = useState([]);

    // Retrieves all user's servers //
    useEffect(() => {
        let data = {
            email: globalEmail,
        };
        Axios.post('http://localhost:3002/get/servers', data)
            .then((res) => {
                setServerList(res.data);
            });
    }, [serverList]);

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
        let data = {
            email: globalEmail,
            name: serverName
        };
        Axios.post('http://localhost:3002/post/add_server', data)
            .then((res) => console.log(res));
    };

    return (
        <div className={classes.box}>
            <br></br>
            <div onClick={() => console.log('clicked')} className={classes.icon}>
                <Typography className={classes.projectName} variant="h5">PJ</Typography>
            </div>
            {serverList ?
            serverList.map((content) => (
                <div onClick={() => setCurrentServer(content)} className={classes.icon}>
                    <Typography className={classes.projectName} variant="h5">{content}</Typography>
                </div>
            )) 
            :
            <p>no server</p>
            };
            <div onClick={() => handleModal()} className={classes.addProject}>
                <Typography className={classes.addButton} variant="h5">+</Typography>
            </div>

            {/* MODAL */}

            <Modal
            open={open}
            onClose={handleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box className={classes.modal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Customize your server 
                    </Typography>
                    <input placeholder="server name" onChange={(e) => setServerName(e.target.value)}/>
                    <Button onClick={() => submitData()}>Create server</Button>
                    </Box>
            </Modal>
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
        backgroundColor: "#555562",
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
        backgroundColor: "white",
        textAlign: "center"
    }
});

export default ProjectList;