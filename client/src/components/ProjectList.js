import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const ProjectList = () => {
    const classes = useStyles();
    return (
        <div className={classes.box}>
            <br></br>
            <div onClick={() => console.log('clicked')} className={classes.icon}>
                <Typography className={classes.projectName} variant="h5">PJ</Typography>
            </div>
            <div className={classes.addProject}>
                <Typography className={classes.projectName} variant="h5">+</Typography>
            </div>
        </div>
    )
};

const useStyles = makeStyles({
    box: {
        margin: 0,
        padding: 0,
        height: "100vh",
        backgroundColor: "#131316",
    },
    icon: {
        height: "5.5vh",
        width: "5.5vh",
        borderWidth: 1,
        borderRadius: 100,
        backgroundColor: "white",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        cursor: "pointer"
    },
    projectName: {
        color: "purple",
        width: "60%",
        textAlign: "center"
    },
    addProject: {
        height: "5.5vh",
        width: "5.5vh",
        borderWidth: 1,
        borderRadius: 100,
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        bottom: "20px",
        position: "absolute",
        marginLeft: "0.8vh"
    }
});

export default ProjectList;