import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useActionData} from "react-router-dom";
import './Project.css';
import Title from "./Title";

export function Project() {
    let data = useActionData();
    let projects;
    let username;
    let password;

    if (data === undefined) {
        data = JSON.parse(localStorage.getItem('data'));
        console.log(data);
        data = new Map(Object.entries(data));
    } else {
        localStorage.setItem('data', JSON.stringify(data));
    }
    projects = data.get('projects');
    username = data.get('user');
    password = data.get('password');

    const RenderMembers = () => {
        return projects.map((component, index) =>
            <React.Fragment key={index}>
                <ProjectMember name={component}/>
            </React.Fragment>
        );
    }

    return (
        <div className="project">
            <Title> Lemonade Mouth </Title>
            <div>{RenderMembers()}</div>
        </div>
    );
}

class QntyHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            qnty: props.qnty,
            qntyMsg: "Enter qnty"
        };
    }

    render() {
        return (
            <div className="qnty-section">
                <div>{this.state.name}: {this.state.qnty}</div>
                <TextField inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}} id="outlined-basic"
                           label={this.state.qntyMsg} variant="outlined" size="small" inputRef={ref => {
                    this.inputRef = ref
                }}/>
                <div><Button variant="contained" color="secondary" onClick={() => {
                    let newQnty = this.state.qnty + Number(this.inputRef.value);
                    this.setState({
                        name: this.state.name,
                        qnty: newQnty,
                        qntyMsg: "Enter qnty"
                    });
                }}>
                    add Items</Button></div>
                <div><Button variant="contained" color="secondary" onClick={() => {
                    let newQnty = this.state.qnty - Number(this.inputRef.value);
                    if (newQnty < 0) {
                        this.setState({
                            name: this.state.name,
                            qnty: this.state.qnty,
                            qntyMsg: "Please enter a qnty < current"
                        });
                    } else {
                        this.setState({
                            name: this.state.name,
                            qnty: newQnty,
                            qntyMsg: "Enter qnty"
                        });
                    }
                }}>
                    remove Items</Button></div>
            </div>);
    }
}

class ProjectMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            users: ["joeM58", "Spencer", "Scarlet"],
            projects: [],
            index: 0
        };
    }


    userSection() {
        let text = "";
        let users = this.state.users;
        for (let i = 0; i < this.state.users.length; i++) {
            text += this.state.users[i];
            if (i !== this.state.users.length - 1) {
                text += ", ";
            }
        }
        return text;
    }

    render() {
        return (
            <div className="project-member">
                <div>{async () => {
                    const url = '/projects/' + this.state.users[0]
                    await fetch(url).then((response) => response.json()).then((list) => {
                        console.log(this.state.index);
                        list.projects.map((project, i) => {
                            this.setState({
                                name: String(list.projects.at(i))
                            })
                        })
                        this.setState({index: Number(this.state.index + 1)});
                    })
                }}{this.state.name}</div>
                <div>{this.userSection()}</div>
                <div>
                    <ul className="no-bullets">
                        <li><QntyHandler name="Guitar Amps" qnty={Number("50")}/></li>
                        <li><QntyHandler name="Microphones" qnty={Number("50")}/></li>
                    </ul>
                </div>
            </div>
        );
    }
}
