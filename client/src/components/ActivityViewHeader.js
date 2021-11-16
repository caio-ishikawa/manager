import { AppBar, Toolbar, Typography } from "@mui/material";
import { useEffect, useState, useContext } from 'react';
import { UserEmailContext, CurrentServerContext } from "../global/contexts";
import Axios from 'axios';

const ActivityViewHeader = () => {

    return(
        <div>
            <AppBar sx={{ backgroundColor: "#393941"}} position="relative" elevation={2}>
                <Toolbar>
                    <Typography>ACTIVITY VIEW HEADER</Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default ActivityViewHeader;