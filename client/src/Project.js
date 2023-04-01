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
    let availability;
    let checkedOutP1Amps;
    let checkedOutP1Mics;
    let checkedOutP2Amps;
    let checkedOutP2Mics;

    if (data === undefined) {
        data = JSON.parse(localStorage.getItem('data'));
        console.log(data);
        data = new Map(Object.entries(data));
    } else {
        localStorage.setItem('data', JSON.stringify(data));
    }
    projects = data.get('projects');
    console.log(projects);
    username = data.get('user');
    password = data.get('password');
    availability = data.get('availability');
    console.log(availability);

    checkedOutP1Amps = data.get('p1CheckedOut');
    console.log(checkedOutP1Amps);
    // checkedOutP1Mics = Number(data.get('p1CheckedOut')[1]);
    // checkedOutP2Amps = Number(data.get('p2CheckedOut')[0]);
    // checkedOutP2Mics = Number(data.get('p2CheckedOut')[1]);

    const RenderMembers = () => {
        return projects.map((component, index) =>
            <React.Fragment key={index}>
                <ProjectMember name={component}
                checkedOutP1Amps = {checkedOutP1Amps}
                checkedOutP1Mics = {checkedOutP1Mics}/>
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
            index: 0,
            checkedOutP1Amps: props.checkedOutP1Amps,
            checkedOutP1Mics: props.checkedOutP1Amps
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

    // displayUserProjects = async () =>{
    //     const url = '/projects/' + this.state.users[0]
    //     fetch(url).then((response) => response.json()).then((list) => {
    //         console.log(this.state.index);
    //         // list.projects.map((project, i) => {
    //         //     this.setState({
    //         //         name: String(list.projects.at(i))
    //         //     })
    //         // })
    //         this.setState({name: list.projects, index: Number(this.state.index + 1)});
    //         //return (this.state.name);
    //     })
    // }

    render() {
        //this.displayUserProjects()
        return (
            <div className="project-member">
                <div>
                    {this.state.name}</div>
                <div>{this.userSection()}</div>
                <div>
                    {/*{async () => {*/}
                    {/*    const url = '/projects/checkedOut/Project1'*/}
                    {/*    await fetch(url).then((response) => response.json()).then((qty) => {*/}
                    {/*        qty.out.map((quantity, i) => {*/}
                    {/*            console.log(qty.checkedOut.at(0))*/}
                    {/*            this.setState({*/}
                    {/*                checkedOut: Number(qty.out.at(0)),*/}
                    {/*            })*/}
                    {/*            console.log(this.state.checkedOut)*/}
                    {/*        })*/}
                    {/*    })*/}
                    {/*}*/}
                    {/*}*/}
                    <ul className="no-bullets">
                        <li><QntyHandler name="Guitar Amps" qnty={"50"}
                        /></li>
                        <li><QntyHandler name="Microphones" qnty={Number("50")}/></li>
                    </ul>
                </div>
            </div>
        );
    }
}
