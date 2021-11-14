import { touchRippleClasses } from '@mui/material';
import Axios from 'axios';

export const login = async (email: string, password: string) => {
    let data = {
        email: email,
        password: password
    };

    Axios.post('http://localhost:3002/auth/login', data)
        .then((res) => {
            return res;
            }
        );
};