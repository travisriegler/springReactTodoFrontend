import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { isUserLoggedIn, getLoggedInUser, logout } from '../services/AuthService'

const HeaderComponent = () => {

    const [isAuth, setIsAuth] = useState(isUserLoggedIn());
    const [loggedInUser, setLoggedInUser] = useState();

    useEffect(() => {
        const updateUserStatus = () => {
            let authStatus = isUserLoggedIn()
            setIsAuth(authStatus);

            if (authStatus) {
                setLoggedInUser(getLoggedInUser());
            }

        };

        // Listen for the custom event and update user status
        window.addEventListener('userLoggedIn', updateUserStatus);

        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener('userLoggedIn', updateUserStatus);
        };
    }, []);

    const handleLogout = () => {
        logout();
        const event = new Event('userLoggedIn');
        window.dispatchEvent(event);  
    }

    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div>
                        <a href='http://localhost:3000' className='navbar-brand ms-4'>
                            Todo Management Application
                        </a>
                    </div>
                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nav'>
                            {
                                isAuth && (
                                    <li className='nav-item'>
                                        <NavLink to="/todos" className="nav-link">Todos</NavLink>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <ul className='navbar-nav'>
                        {
                            !isAuth && (
                                <li className='nav-item'>
                                    <NavLink to="/register" className="nav-link">Register</NavLink>
                                </li>     
                            )
                        }
                        {
                            !isAuth && (
                                <li className='nav-item'>
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                            )
                        }
                        {
                            isAuth && (
                                <li className='nav-item'>
                                    <NavLink to="/login" className="nav-link" >User: {loggedInUser}</NavLink>
                                </li>
                            )
                        }
                        {
                            isAuth && (
                                <li className='nav-item'>
                                    <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent