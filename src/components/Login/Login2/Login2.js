import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const Login2 = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const { loginUser } = useAuth()
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault()
        loginUser(email, pass, navigate)
        // fetch(`http://localhost:5000/login/${email}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data?.pass1 === pass) {
        //             loginUser(email, pass)
        //             setError('')
        //         } else {

        //             setError('please Register or give correct password')
        //         }
        //     })
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <input placeholder='email' onChange={e => setEmail(e.target.value)} type="email" name="" id="" /> <br />
                <input placeholder='password' onChange={e => setPass(e.target.value)} type="password" name="" id="" /> <br />
                <button type="submit">Login</button>
            </form>
            <p>{error}</p>

        </div>
    );
};

export default Login2;