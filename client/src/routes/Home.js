import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div style={{ backgroundColor: "#121D2B", height: "100vh", margin: 0, paddint: 0, overflow: "hidden"}}>
            <Typography sx={{ color: "white"}} variant="h4">Welcome, please</Typography>
            <Link to="/register">
                <Button>Get started!</Button>
            </Link>
            <Link to="/login">
                <Button>Log in</Button>
            </Link>
        </div>
    );
};

export default Home;