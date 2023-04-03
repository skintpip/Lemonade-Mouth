import React, {useState} from 'react';
import Button from '@mui/material/Button';
import './App.js';
import './App.css';
import {Link, Form, useSubmit} from "react-router-dom";




export function Login(props) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setName(value);
    };
    const handleChange2 = (event) => {
        const value = event.target.value;
        setPassword(value);
    };

    return (
            <div className="auth-form-container">
                <h2>Login</h2>
                <Form method="put" action="/projectPage/" className="currentForm">
                    <input type="text" name="username" variant="filled" placeholder="username" onChange={handleChange}/>
                    <input name="password" variant="filled" type="password" placeholder="password" onChange={handleChange2}/>
                    <Button variant="contained" color="secondary" type="submit">Log In</Button>
                </Form>
                <h1>
                    <Button variant="contained" color="secondary" component={Link} to="/register/">Register here!</Button>
                </h1>
            </div>
        );
}
