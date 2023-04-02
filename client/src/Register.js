import React, { useState } from "react";
import {Form, Link, Redirect, useActionData, useNavigate} from "react-router-dom";

export function Register(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUsername] = useState('');
    let result = useActionData();
    if (result === undefined)
        result = "";



    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <h3>{result}</h3>
        <Form className="register-form" method="post">
            <label htmlFor="username">username</label>
            <input value={username} name="username" onChange={(e) => setUsername(e.target.value)} id="username" placeholder="username" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register!</button>
        </Form>
            <h4>
                <Link to='/'>Return to Login Page!</Link>
            </h4>
        </div>
    );
}