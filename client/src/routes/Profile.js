import { Grid, Avatar, Badge, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProjectList from '../components/ProjectList';
import def_profile from '../assets/def_profile.png';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext, useRef } from 'react';
import { UserEmailContext } from '../global/contexts';
import Axios from 'axios';
import { styled } from '@mui/styles';
import camera from '../assets/camera.png';


const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    backgroundColor: "white",
    cursor: "pointer"
  }));


const Profile = () => {
    const inputFile = useRef(null)
    const classes = useStyles();
    const [image, setImage] = useState('');
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    const [picLink, setPicLink] = useState('');

    useEffect(() => {
        let data = {
            email: globalEmail 
        }
        Axios.post('http://localhost:3002/get/user_details', data)
            .then((res) => {
                let key = res.data.profile_picture;
                let url = "https://manager-io-app.s3.amazonaws.com/" + key;
                setPicLink(url);
            });
    }, []);

    const addPicture = () => {
        inputFile.current.click();
    };

    const submitData = (file) => {
        const fileData = new FormData()
        fileData.append('file', file);
        fileData.append('email', globalEmail)

        Axios.post('http://localhost:3002/post/profile_pic', fileData, { headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => console.log(res));
    };

    return(
        <div className={classes.box}>
            <Grid container spacing={0}>
                <Grid item className={classes.root} item sm={1} md={0.6} lg={0.6}>
                    <ProjectList/> 
                </Grid>
                <Grid item sm={11} md={11.4} lg={11.4}>
                    <div>
                        <Grid container alignItems="center" justifyContent="center" spacing={0}>
                            <Grid item sm={2.5} md={2.5} lg={2.5}>
                                <Badge overlap="circular" anchorOrigin={{vertical:"bottom", horizontal:"right"}} badgeContent={<SmallAvatar onClick={() => addPicture()} src={camera}/>} sx={{ marginBottom: "1.5vh"}}>
                                    {picLink ? 
                                    <Avatar sx={{ height: "15vh", width: "15vh"}} src={picLink}/>
                                    :
                                    <Avatar sx={{ height: "15vh", width: "15vh", }} src={def_profile}/>
                                    }
                                </Badge>
                            </Grid>
                            <Grid item sm={5} md={5} lg={5}>
                                <div className={classes.profileBox}>
                                    <Typography sx={{ color: "white", margin: "1vh"}} variant="h6">First Name: </Typography>
                                    <Typography sx={{ color: "white", margin: "1vh"}} variant="h6">Last Name: </Typography>
                                    <Typography sx={{ color: "white", margin: "1vh"}} variant="h6">Bio: </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.serverList}></div>
                    <Link to="/main">
                        <p>MAIN BUTTON</p>
                    </Link>
                </Grid>
            </Grid>
            <input type="file" id="file" ref={inputFile} style={{ display: "none "}}onChange={(e) => submitData(e.target.files[0])}/>
        </div>
    )
};

const useStyles = makeStyles({
    root:{
        color:"white"
    },
    box: {
        margin: 0,
        padding: 0,
        height: "100vh",
        backgroundColor: "#393941",
    },
    profileBox: {
        border: "1px solid white",
        borderRadius: "10px",
        height: "15vh",
        marginBottom: "1.5vh"
    },
    serverList: {
        border: "1px solid white",
        borderRadius: "10px",
        height: "70vh",
        width: "63%",
        margin: "auto"
    }
})

export default Profile;