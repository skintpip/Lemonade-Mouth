import React, {createRef, Component, useState, useEffect, useRef} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.js';
import './App.css';
import {waitFor} from "@testing-library/react";
import {Route, Router, Routes, Link, Form} from "react-router-dom";




export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: ""
        };
        //this.handleChange = this.updateInput.bind(this);
    }
    buildURL() {
        return "/projectPage/" + this.state.user;
    }
    const
    handleChange = (event) => {
        const value = event.target.value;
        console.log(this.state.user)
        this.setState({
            user: (value)
        });
    };
    handleChange2 = (event) => {
        const value = event.target.value;
        const pass = this.state.pass;
        this.setState({
            pass: (value)
        });
    };
    render() {
        return (
            <div className="auth-form-container">
                <h2>Login</h2>
                <Form method="post" action="projectPage/" className="currentForm">
                    <input type="text" name="username" variant="filled" placeholder="username" onChange={this.handleChange}
                    />
                    <input type="text" name="password" variant="filled" type="password" placeholder="password" onChange={this.handleChange2}
                    />
                    <Button variant="contained" color="secondary" type="submit">Log In</Button>
                    <Button variant="contained" color="secondary" type="submit">Register here!</Button>
                </Form>
            </div>
        );
    }
}
