import React, { useState } from 'react';
import Register from '@components/register';
import Login from '@components/login';

const HomePage = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    const toggleView = () => {
        setIsLoginView(prev => !prev);
    };

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {isLoginView ? (
                <Login toggleView={toggleView} />
            ) : (
                <Register toggleView={toggleView} />
            )}
        </div>
    );
};

export default HomePage;