import React, {createRef, Component, useState, useEffect, useRef} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.js';
import './App.css';
import {waitFor} from "@testing-library/react";
import {Route, Router, Routes, Link, Form, useSubmit} from "react-router-dom";




export function Login(props) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const submit = useSubmit();

    const handleChange = (event) => {
        const value = event.target.value;
        setName(value);
    };
    const handleChange2 = (event) => {
        const value = event.target.value;
        setPassword(value);
    };

    function RegisterUser() {
        const formData = new FormData();
        formData.append(name, password)
        submit(formData, {
            action: "register/",
            method: "post"
        })
        return null;
    }

    return (
            <div className="auth-form-container">
                <h2>Login</h2>
                <Form method="put" action="projectPage/" className="currentForm">
                    <input type="text" name="username" variant="filled" placeholder="username" onChange={handleChange}/>
                    <input name="password" variant="filled" type="password" placeholder="password" onChange={handleChange2}/>
                    <Button variant="contained" color="secondary" type="submit">Log In</Button>
                </Form>
                <Button variant="contained" color="secondary" type="submit" onClick={() => {RegisterUser()}}>Register here!</Button>

            </div>
        );
}
