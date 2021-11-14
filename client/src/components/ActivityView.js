import { makeStyles } from "@mui/styles";

const ActivityGrid = () => {
    const classes = useStyles();

    return(
        <div className={classes.box}>
            <br></br>
            <p>ACTIVITY</p>
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