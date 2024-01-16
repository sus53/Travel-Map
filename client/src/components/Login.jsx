import React, { useState } from 'react';
import { LoginUser } from '../function/User';

const Login = ({ setIsLogin, setCurrentUser }) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const onLogin = async (e) => {
        e.preventDefault();
        const user = {
            username, password
        }
        console.log(user)
        const res = await LoginUser(user)
        if (res)
        {
            window.localStorage.setItem("user", res.username);
            setCurrentUser(res.username);
            setIsLogin(false);
        }
    }


    return (
        <div className="user-div">
            <div className='user-form'>
                <div>
                    <h3>Login</h3>
                    <div>
                        <button className='btn-close' onClick={() => setIsLogin(false)}>X</button>
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
                    <button onClick={(e) => onLogin(e)}>Login</button>
                </div>
            </div>
        </div >
    );
}

export default Login;
