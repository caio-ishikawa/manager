import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div>
            <p>HOME</p>
            <Link to="/register">
                <Button>Get started!</Button>
            </Link>
            <Link to="/main">
                <Button>Log in</Button>
            </Link>
        </div>
    );
};

export default Home;