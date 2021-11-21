import { makeStyles } from "@mui/styles";

const ActivityGrid = ( props ) => {
    const classes = useStyles();


    return(
        <div className={classes.box}>
            <br></br>
        </div>
    )
};

const useStyles = makeStyles({
    box: {
        margin: 0,
        padding: 0,
        height: "93.7vh",
        backgroundColor: "#1C1C21",
    },
    divider: {
        width: "90%",
        marginTop: "2vh",
        marginBottom: "2vh"
    },
    updates: {
        color: "#C9CBCF",
    },
    updateDiv: {
        width: "90%",
        margin: "auto",
    },
    title: {
        textAlign: "center"
    }
})


export default ActivityGrid;