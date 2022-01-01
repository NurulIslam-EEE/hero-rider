import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const UserProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState({})
    useEffect(() => {
        fetch(`https://pacific-shelf-98657.herokuapp.com/profile/${user?.email}`)
            .then(res => res.json())
            .then(data => setProfile(data))
    }, [user?.email])
    return (
        <div>
            <img src={`data:image/png;base64,${profile?.profile}`} alt="" />
            <p>{profile?.name}</p>
            <p>{profile?.role}</p>
            <p>{profile?.address}</p>
        </div>
    );
};

export default UserProfile;