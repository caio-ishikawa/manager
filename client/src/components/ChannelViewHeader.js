import { AppBar, Toolbar, Typography } from "@mui/material";
import { useEffect, useState, useContext } from 'react';
import { UserEmailContext, CurrentServerContext } from "../global/contexts";
import Axios from 'axios';
import { io } from "socket.io-client";

const ChannelViewHeader = () => {

    return(
        <div>
            <AppBar sx={{ backgroundColor: "#393941"}} position="relative" elevation={2}>
                <Toolbar>
                    <Typography variant="h5">Members</Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default ChannelViewHeader;