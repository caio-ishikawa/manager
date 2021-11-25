import { AppBar, Toolbar, Typography } from "@mui/material";
import { CurrentServerContext } from "../global/contexts";
import { useState, useContext } from 'react';

const ActivityViewHeader = () => {
    const [currentServer, setCurrentServer] = useContext(CurrentServerContext);


    return(
        <div>
            <AppBar sx={{ backgroundColor: "#393941"}} position="relative" elevation={2}>
                <Toolbar>
                    <Typography style={{ flex: 1}} sx={{ fontWeight: "bold", fontSize: "2vh"}}>{currentServer ? currentServer : "NO SERVER"}</Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default ActivityViewHeader;