import { Grid, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import def_profile from '../assets/def_profile.png';

export const renderOldChat = (serverMessages) => {

    return serverMessages.map((string, idx) => {
        return(
            <div>
            <Grid key={idx} container justify="center" spacing={-26}>
                <Grid sx={{ borderRadius: "10%", overflow: "hidden", display:"block", alignItems:"center"}} item sm={1.5} md={1.5} lg={1.5}>
                    <Avatar sx={{ height: "5vh", width: "5vh", marginBottom: "2vh", marginTop: "1.5vh"}} alt={string.user} src={def_profile}/>
                </Grid>
                <Grid item sm={10} md={9} lg={9}>
                    <div>
                    { string.message ? 
                            <div>
                                <p>{string.user}:</p>
                                <p>{string.message}</p>
                            </div>
                            :
                            <div key={idx}>
                                <p>{string.user}:</p>
                                <img alt={string.user} style={{ maxHeight: "25vh"}} src={"https://manager-io-app.s3.amazonaws.com/" + string.file_key}/>
                            </div>
                        }
                    </div>
                </Grid>
            </Grid>
            <hr color="#555562" />
        </div> 
    )
    })
};

const useStyles = makeStyles({
    pic: {
        borderRadius: "10%",
        overflow: "hidden",
        display: "block",
        alignItems: "center"
    },
    divider: {
        color: "black",
        width: "20%",
        margin: "0 auto"
    },
})