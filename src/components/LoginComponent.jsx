import React, { useState } from 'react'
import { loginAPICall, saveLoggedInUser, storeToken } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        usernameOrEmail: '',
        password: '',
    });


    const handleLoginForm = (e) => {

        e.preventDefault();

        if (validateForm()) {

            const user = {
                usernameOrEmail: username,
                password
            };
    
            loginAPICall(user)
                .then(response => {
                    //const token = "Basic " + window.btoa(`${username}:${password}`)
                    const token = "Bearer " + response.data.accessToken;

                    const role = response.data.role;

                    storeToken(token);
                    saveLoggedInUser(username, role);
    
                    const event = new Event('userLoggedIn');
                    window.dispatchEvent(event);  
                          
                    navigate("/todos");
                })
                .catch(error => {
                    console.error(error);
                });

        }


    }


    const validateForm = () => {
        let valid = true;
        const errorsCopy = {...errors}

        if (username.trim()) {
            errorsCopy.usernameOrEmail = '';
        } else {
            errorsCopy.usernameOrEmail = "Username or Email is required";
            valid = false;
        }

        if (password.trim()) {
            errorsCopy.password = '';
        } else {
            errorsCopy.password = "Password is required";
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card mt-4'>
                        <div className='card-header'>
                            <h2 className='text-center'>Login Form</h2>
                        </div>
                        <div className='card-body'>
                            <form>


                                <div className='row mb-3 d-flex justify-content-center align-items-center'>
                                    <label className='col-md-3 control-label'>Username or Email</label>
                                    <div className='col-md-9'>
                                        <input 
                                            type='text'
                                            name='username'
                                            className={`form-control ${errors.usernameOrEmail ? 'is-invalid' : ''}`}
                                            placeholder='Enter username or email'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        { errors.usernameOrEmail && <div className="invalid-feedback">{errors.usernameOrEmail}</div> }
                                    </div>
                                </div>


                                <div className='row mb-3 d-flex justify-content-center align-items-center'>
                                    <label className='col-md-3 control-label'>Password</label>
                                    <div className='col-md-9'>
                                        <input 
                                            type='password'
                                            name='password'
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            placeholder='Enter password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        { errors.password && <div className="invalid-feedback">{errors.password}</div> }
                                    </div>
                                </div>


                                <div className='form-group d-flex justify-content-center align-items-center'>
                                    <button className='btn btn-primary' onClick={handleLoginForm}>
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent