import Axios from 'axios';

export const register = async(first: string, last: string, email: string, password: string) => {
    let data = {
        first_name: first,
        last_name: last,
        email: email,
        password: password
    };

    Axios.post('http://localhost:3002/auth/register', data)
        .then((res) => console.log(res));
};
