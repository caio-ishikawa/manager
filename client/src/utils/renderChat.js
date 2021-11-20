import { Grid, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import def_profile from '../assets/def_profile.png';
import { changeColor } from './changeColor';
import { revertColor } from './revertColor';

export const renderChat = (serverMessages) => {

    return serverMessages.map((string, idx) => {
        return(
            <div id={idx} style={{ display: "flex", textAlign: "left", alignItems: "top", paddingLeft: "1vh" }} onMouseEnter={() => changeColor(idx)} onMouseOut={() => revertColor(idx)}>
            <Grid key={idx} container justify="center" spacing={-26}>
                <Grid sx={{ borderRadius: "10%", overflow: "hidden", display:"block", alignItems:"center"}} item sm={1.5} md={1.5} lg={1.5}>
                    <Avatar sx={{ height: "3.5vh", width: "3.5vh", marginBottom: "2vh", marginTop: "1.5vh"}} alt={string.user} src={def_profile}/>
                </Grid>
                <Grid item sm={10} md={9} lg={9}>
                    <div stlye={{ display: "flex", alignItems: "left", textAlign: "left"}}>
                    { string.message ? 
                            <div style={{ marginLeft: "-1.5vh", marginTop: "-0.55vh",}} key={idx}>
                                <p style={{ fontWeight: "600"}}>{string.email}:</p>
                                <p style={{ marginTop: "-0.85vh" }}>{string.message}</p>
                            </div>
                            :
                            <div style={{ marginLeft: "-1.5vh", marginTop: "-0.55vh"}}  key={idx}>
                                <p style={{ fontWeight: "600"}}>{string.user}:</p>
                                <img alt={string.user} style={{ maxHeight: "25vh"}} src={"https://manager-io-app.s3.amazonaws.com/" + string.key}/>
                            </div>
                        }
                    </div>
                </Grid>
            </Grid>
        </div> 
    )
    });
};
