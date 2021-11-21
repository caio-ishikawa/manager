import { AppBar, Toolbar, Typography } from "@mui/material";

const ActivityViewHeader = () => {

    return(
        <div>
            <AppBar sx={{ backgroundColor: "#393941"}} position="relative" elevation={2}>
                <Toolbar>
                    <Typography>VOICE CHAT</Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default ActivityViewHeader;