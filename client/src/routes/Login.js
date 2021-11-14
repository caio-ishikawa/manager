import { useState } from 'react';
import { login } from '../utils/login.ts';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const submitData = async() =>{
        console.log({email, password})
        let data = {
            email: email,
            password: password
        };
        Axios.post('http://localhost:3002/auth/login', data)
            .then((res) => {
                if (res.data === "SUCCESS") {
                    navigate("/main");
                }
            });
    };

    return(
        <div>
            <p>REGISTER</p>
            <br/>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <br/>
            <input placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={() => submitData()}>Register</button>
            <Link to="/">
                <button>main</button>
            </Link>
        </div>
    );

};

export default Login;