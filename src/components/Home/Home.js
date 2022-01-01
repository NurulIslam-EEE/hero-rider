import React from 'react';
import Login from '../Login/Login/Login';
import Register from '../Login/Register/Register';

const Home = () => {
    return (
        <div className='row'>
            <div className="col-md-6">
                <Login />
            </div>
            <div className="col-md-6">
                <Register />
            </div>

        </div>
    );
};

export default Home;