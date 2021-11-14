import { useState } from 'react';
import Axios from 'axios';
import { register } from '../utils/register.ts';
import { Link } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitData = () => {
        // let data = {
        //     first_name: firstName,
        //     last_name: lastName,
        //     email: email,
        //     password: password
        // };
        // Axios.post('http://192.168.1.74:3002/auth/register')
        //     .then((res) => console.log(res));
        register(firstName, lastName, email, password);
    };

    return(
        <div>
            <p>REGISTER</p>
            <br/>
            <input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
            <br/>
            <input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
            <br/>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <br/>
            <input placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={submitData}>Register</button>
            <Link to="/">
                <button>main</button>
            </Link>
        </div>
    )
};

export default Register;