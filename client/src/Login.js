import React, {createRef, Component, useState, useEffect, useRef} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.js';
import './App.css';
import {waitFor} from "@testing-library/react";
import {Route, Router, Routes, Link} from "react-router-dom";




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
        return "/projectPage/" + this.state.user + "/" + this.state.pass;
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
                <form className="currentForm">
                    <input type="text" id="user" label="Username" variant="filled" placeholder="username" onChange={this.handleChange}
                    />
                    <input type="text" id="password" label="password" variant="filled" type="password" placeholder="password"
                           onChange={this.handleChange2}
                    />
                    <Button variant="contained" component={Link} to={this.buildURL()} color="secondary" >Log In</Button>
                    <Button variant="contained" component={Link} to={this.buildURL()} color="secondary" >Register here!</Button>
                </form>
            </div>
        );
    }
}
