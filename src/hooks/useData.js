import React, { useState } from 'react';

const useData = () => {
    const [user, setUser] = useState()

    return {
        user,
        setUser
    };
};

export default useData;