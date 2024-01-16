import React, { useState } from 'react';
import { RegisterUser } from '../function/User';
const Register = ({ setIsRegister, setCurrentUser }) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const onRegister = async (e) => {
        e.preventDefault();
        const user = {
            username, password
        }
        const res = await RegisterUser(user)
        if (res)
        {
            window.localStorage.setItem("user", res.username);
            setCurrentUser(res.username);
            setIsRegister(false);
        }
    }

    return (
        <div className='user-div'>
            <div className='user-form'>
                <div>
                    <h3>Register</h3>
                    <div>
                        <button className="btn-close" onClick={() => setIsRegister(false)}>X</button>
                    </div>
                </div>
                <div>
                    <label htmlFor={"username"}>Username</label>
                    <input id='username' onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type={"password"} id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button onClick={(e) => onRegister(e)}>Register</button>
                </div>
            </div>
        </div>
    );
}

export default Register;
