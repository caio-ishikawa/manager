import { makeStyles } from "@mui/styles";

const ChannelView = () => {
    const classes = useStyles();

    return(
        <div className={classes.box}>
            <br></br>
            <p>CHANNEL</p>
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
});


export default ChannelView;