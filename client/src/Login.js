import React, {createRef, Component, useState, useEffect, useRef} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.js';
import './App.css';
import {waitFor} from "@testing-library/react";




export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: ""
        };
        //this.handleChange = this.updateInput.bind(this);
    }

    async sendLogin(user, pass) {
        console.log(user, pass);
        const url = '/login/' + user + '/' + pass;
        await fetch(url).then((response) => response.json())
            .then((userName) => this.getProjects(userName.username))
            .then((list) => console.log(list.projects))
    }
    async getProjects(user) {
        const url = '/projects/' + user;
        await fetch(url).then((response) => response.json()).then((projectsList) => {
          return projectsList;
        })
    }

    handleUserPass = () => {
        const {user, pass} = this.state;
        this.setState({
            user: this.state.user,
            pass: this.state.pass,
        });
        this.sendLogin(this.state.user, this.state.pass)
    };

    const
    handleChange = (event) => {
        const value = event.target.value;
        console.log(this.user)
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
                    <Button variant="contained" color="secondary" onClick={() => this.handleUserPass()}>Log In</Button>
                    <Button variant="contained" color="secondary" onClick={() => this.handleUserPass()}>Register here!</Button>
                </form>
            </div>
        );
    }
}
