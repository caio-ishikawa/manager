import { AppBar, Toolbar, Typography, InputBase, Autocomplete, Paper } from "@mui/material";
import Axios from 'axios';
import { useState, useEffect, useContext } from "react";
import { UserEmailContext, CurrentServerContext } from '../global/contexts';
import { makeStyles } from '@mui/styles';


const ChannelViewHeader = () => {
    const classes = useStyles();
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);
    const [allMembers, setAllMembers] = useState([]);


    useEffect(() => {
        let data = {
            params: {
                email: globalEmail,
                server: currentServer
            }
        };
        Axios.get("http://localhost:3002/get/all_members", data )
            .then((res) => {
                let arr = [];
                Object.keys(res.data).forEach(key => {
                    arr.push(res.data[key].email);
                });
                setAllMembers(arr);
            });
    }, [currentServer]);

    return(
        <div>
            <AppBar sx={{ backgroundColor: "#393941"}} position="relative" elevation={2}>
                <Toolbar>
                <Autocomplete
                    id="combo-box-demo"
                    options={allMembers}
                    style={{ width: 300 }}
                    PaperComponent={({children}) => (
                        <Paper style={{ background: "#1C1C21", color: "white", width: "140vh", textAlign: "center"}}>{children}</Paper>
                    )}
                    renderInput={(params) => {
                        const {InputLabelProps,InputProps,...rest} = params;
                        return <InputBase sx={{ backgroundColor: "#555562", borderRadius: "5px", color: "white", width: "100%"}} placeholder="Search" color="white" inputProps={{ style: {color: "#1C1C21", margin: "0.5vh", backgroundColor: "#1C1C21" }}} {...params.InputProps} {...rest}  />}}
                    />
                </Toolbar>
            </AppBar>
        </div>
    )
};

const useStyles = makeStyles({
    chatInput: {
        backgroundColor: "#555562",
        borderRadius: 5,
        width: "100%",
        textAlign: "center",
        color: "white",
        margin: "auto",
    },
})

export default ChannelViewHeader;