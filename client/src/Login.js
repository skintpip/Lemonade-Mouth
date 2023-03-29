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
        await fetch(url).then((response) => response.json()).then((userName) => alert("Logged In " + userName.username));
        await this.displayProjects(user)
    }
    async displayProjects(user) {
        const url = '/projects/' + user
        await fetch(url).then((response) => response.json()).then((projectsList) => alert("Projects" + projectsList.projects[0][0]))
    }

    handleUserPass = () => {
        const {user, pass} = this.state;
        this.setState({
            user: this.state.user,
            pass: this.state.pass,
        });
        this.displayProjects(this.state.user, this.state.pass)
    };


    // render() {
    //     return (
    //         <div className="auth-form-container">
    //             <h2>Login</h2>
    //             <form className="currentForm" onSubmit={handleSubmit}>
    //                 <label htmlFor="email">email</label>
    //                 <input value={user} onChange={(e) => this.setState(user , pass: this.state.pass)} type="email"
    //                        placeholder="youremail@gmail.com" id="email" name="email"/>
    //                 <label htmlFor="password">password</label>
    //                 <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********"
    //                        id="password" name="password"/>
    //                 <button type="submit" onClick={() => loginUser(email, pass)}>Log In</button>
    //             </form>
    //             <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account?
    //                 Register here.
    //             </button>
    //         </div>
    //     );
    // }
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
                <h2>Login{this.state.user}{this.state.pass}</h2>
                <form className="currentForm">
                    <input type="text" id="user" label="Username" variant="filled" onChange={this.handleChange}
                    />
                    <input type="text" id="password" label="password" variant="filled" type="password"
                           onChange={this.handleChange2}
                    />
                    <Button type="contained" onClick={() => this.handleUserPass()}>Log In</Button>
                </form>
            </div>
        );
    }
}
