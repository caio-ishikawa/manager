import { useState } from 'react';
import { login } from '../utils/login.ts';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserEmailContext } from '../global/contexts';
import { io } from 'socket.io-client';
import { TextField, InputBase, Grid, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';


const Login = () => {
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 
    const classes = useStyles();

    const submitData = async() =>{
        let data = {
            email: globalEmail,
            password: password
        };
        Axios.post('http://localhost:3002/auth/login', data)
            .then((res) => {
                if (res.data === "SUCCESS") {
                    navigate("/main");
                }
            });
    };

    return(
        <div style={{ backgroundColor: "#24252E", height: "100vh", overflow:"hidden"}}>
            <Grid container spacing={0}>
                <Grid item md={3.5} lg={3.5}>
                    <Typography sx={{ color: "white", marginLeft: "2vh", marginTop:"5vh", marginBottom: "5vh"}} variant="h4">Log in</Typography>
                    <InputBase className={classes.chatInput} placeholder="Email" color="white" inputProps={{ style: {color: "white", margin: "0.5vh" }}} value={globalEmail} onChange={(e) => setGlobalEmail(e.target.value)}/>
                    <br/>
                    <InputBase type="password" className={classes.chatInput} placeholder="Password" color="white" inputProps={{ style: {color: "white", margin: "0.5vh" }}} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Typography sx={{ marginLeft: "2vh", color: "#9292A0"}} variant="body">Don't have an account? <Link to="/register">Sign up here</Link></Typography>
                    <br/>
                    {/* <Link to="/">
                        <Button variant="contained" sx={{ backgroundColor: "#9292A0", marginLeft: "2vh", marginTop: "2vh"}}>Back</Button>
                    </Link> */}
                    <Button variant="contained" sx={{ color: "white", marginLeft: "2vh", marginTop: "2vh"}} onClick={() => submitData()}>Log in</Button>
                </Grid>
                <Grid sx={{ backgroundColor: "#131316", height: "100vh", overflow: "hidden"}} item md={8.5} lg={8.5}>
                    <p>yeah boi</p>
                </Grid>
            </Grid>

        </div>
    );

};

const useStyles = makeStyles({
    chatInput: {
        backgroundColor: "#555562",
        borderRadius: 5,
        width: "90%",
        textAlign: "center",
        color: "white",
        marginLeft: "2vh",
        marginBottom: "2vh"
    },
})

export default Login;