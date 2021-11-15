import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import ProjectList from '../components/ProjectList';
import ProjectView from '../components/ProjectView';
import ChannelView from '../components/ChannelView';
import ActivityGrid from '../components/ActivityView';
import ChatHeader from '../components/ChatHeader';
import ChannelViewHeader from '../components/ChannelViewHeader';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserEmailContext } from '../global/contexts';

const Main = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [globalEmail, setGlobalEmail] = useContext(UserEmailContext);
    console.log(globalEmail);

    return(
        <div className={classes.root}>
            <Grid className={classes.root} container spacing={0}>
                <Grid className={classes.root} item sm={1} md={0.6} lg={0.6}>
                    <ProjectList/> 
                </Grid>
                <Grid item sm={2} md={2.6} lg={2.3}>
                    <ActivityGrid/>
                </Grid>
                <Grid item sm={7} md={6.5} lg={6.9}>
                    <ChatHeader/>
                    <ProjectView/> 
                </Grid>
                <Grid item sm={2} md={2.3} lg={2.2}>
                    <ChannelViewHeader/>
                    <ChannelView/>
                </Grid>
            </Grid>
        </div>
    )
};


const useStyles = makeStyles({
    root:{
        color:"white"
    }
})


export default Main


