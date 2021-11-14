import { AppBar, Toolbar, Typography } from "@mui/material";

const ChannelViewHeader = () => {

    return(
        <div>
            <AppBar sx={{ backgroundColor: "#393941"}} position="relative" elevation={2}>
                <Toolbar>
                    <Typography>CHANNEL VIEW HEADER</Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default ChannelViewHeader;