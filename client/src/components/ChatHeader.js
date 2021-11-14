import { Typography, Toolbar, AppBar, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from 'react-router-dom';

const ChatHeader = () => {
    const classes = useStyles();

    return(
        <div>
            <Box sx={{ flexGrow: 1, width: "100%"}}>
                <AppBar className={classes.bar} sx={{ backgroundColor: "#393941"}} position="relative" elevation={2}>
                    <Toolbar>
                        <Typography>CHAT HEADER</Typography>
                        <Link to="/">Test</Link>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
};


const useStyles = makeStyles({
    bar: {
        minHeight: 20 
    }
})


export default ChatHeader;