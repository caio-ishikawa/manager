import { ClassNames } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import TextField from '@mui/material/TextField';
import { InputBase } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from "@mui/material";
import ChatHeader from "./ChatHeader";

const ProjectView = () => {
    const classes = useStyles();

    return(
        <div className={classes.box}>
            <br></br>
            <p>PROJECT</p>
            <div className={classes.chat}>
                <p>test</p>
            </div>
            <div className={classes.chatContainer}>
                <InputBase className={classes.chatInput} placeholder="Message #General" color="white" inputProps={{ style: {color: "white", margin: "0.5vh" }}} startAdornment={<IconButton><AddCircleIcon className={classes.icon}/></IconButton>}/>
            </div>
        </div>
    )

};
const useStyles = makeStyles({
    box: {
        margin: 0,
        padding: 0,
        height: "93.7vh",
        backgroundColor: "#393941",
        overflow: "hidden"
    },
    chat: {
        height: "78vh",
        borderWidth: "5px",
        borderBottomWidth: "1px",
        borderBottomColor: "#555562",
        borderBottomStyle: "solid",
        width: "95%",
        marginBottom: "3%",
        margin: "auto",
        overflowY: "auto",
    },
    chatContainer: {
        display: "flex",
        textAlign: "center"
    },
    chatInput: {
        backgroundColor: "#555562",
        borderRadius: 5,
        width: "90%",
        textAlign: "center",
        color: "white",
        margin: "auto",
    },
    input: {
        color: "white"
    },
    icon: {
        color: "#9292A0",
        marginRight: "1%"
    },
      '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.4)',
      outline: '1px solid slategrey'
    }
  }
});


export default ProjectView;
