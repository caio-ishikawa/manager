import { makeStyles } from "@mui/styles";
import io from 'socket.io-client';

const ActivityGrid = () => {
    const classes = useStyles();

    return(
        <div className={classes.box}>
            <br></br>
            <p>ACTIVITY</p>
            <p>When user joins</p>
            <p>When documents get uploaded</p>
            <p>When user leaves</p>
        </div>
    )
};

const useStyles = makeStyles({
    box: {
        margin: 0,
        padding: 0,
        height: "100vh",
        backgroundColor: "#1C1C21",
    },
})


export default ActivityGrid;