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
import { register } from '../utils/register';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    const submitData = () => {
        // let data = {
        //     first_name: firstName,
        //     last_name: lastName,
        //     email: email,
        //     password: password
        // };
        // Axios.post('http://192.168.1.74:3002/auth/register')
        //     .then((res) => console.log(res));
        register(firstName, lastName, email, password);
    };

    return(
        <div style={{ backgroundColor: "#24252E", height: "100vh", overflow:"hidden"}}>
                <Grid container spacing={0}>
                    <Grid item md={3.5} lg={3.5}>
                        <Typography sx={{ color: "white", marginLeft: "2vh", marginTop:"5vh", marginBottom: "5vh"}} variant="h4">Welcome</Typography>
                        <InputBase className={classes.chatInput} placeholder="First Name" color="white" inputProps={{ style: {color: "white", margin: "0.5vh" }}} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        <InputBase className={classes.chatInput} placeholder="Last Name" color="white" inputProps={{ style: {color: "white", margin: "0.5vh" }}} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        <InputBase className={classes.chatInput} placeholder="Email" color="white" inputProps={{ style: {color: "white", margin: "0.5vh" }}} value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <br/>
                        <InputBase type="password" className={classes.chatInput} placeholder="Password" color="white" inputProps={{ style: {color: "white", margin: "0.5vh" }}} value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <Typography sx={{ marginLeft: "2vh", color: "#9292A0"}} variant="body">Already have an account? Log in here</Typography>
                        <br/>
                        <Link to="/">
                            <Button variant="contained" sx={{ backgroundColor: "#9292A0", marginLeft: "2vh", marginTop: "2vh"}}>Back</Button>
                        </Link>
                        <Button variant="contained" sx={{ color: "blue", marginLeft: "2vh", marginTop: "2vh"}} onClick={() => submitData()}>Register</Button>
                    </Grid>
                    <Grid item sx={{ backgroundColor: "#131316", height: "100vh", overflow: "hidden"}} item md={8.5} lg={8.5}>
                    <p>yeah boi</p>
                    </Grid>
                </Grid>
        </div>
    )
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

export default Register;