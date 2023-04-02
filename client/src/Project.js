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

//TODO: HANDLE NOT NUMBER INPUTS
function QntyHandler(props) {
    const [projName, setProjName] = useState(props.projName);
    const [name, setName] = useState(props.name);
    const [qnty, setQnty] = useState(props.qnty);
    const [msg, setMsg] = useState("Enter qnty");
    const [inputRef, setInputRef] = useState();

        return (
            <div className="qnty-section">
                <div>{name}: {qnty}</div>
                <TextField inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}} id="outlined-basic"
                           label={msg} variant="outlined" size="small" inputRef={ref => {
                    setInputRef(ref);
                }}/>
                <div><Button variant="contained" color="secondary" onClick={() => {
                    setQnty(Number(qnty) + Number(inputRef.value));
                }}>
                    add Items</Button></div>
                <div><Button variant="contained" color="secondary" onClick={() => {
                    let newQnty = Number(qnty) - Number(inputRef.value);
                    if (newQnty < 0) {
                        setMsg("Please enter a qnty < current");
                    } else {
                        setQnty(newQnty);
                    }
                }}>
                    remove Items</Button></div>
            </div>);
}

function ProjectMember(props) {
    const [name, setName] = useState(props.name);
    const [amps, setAmps] = useState("");
    const [mics, setMics] = useState("");

        return (
            <div className="project-member">
                <div>
                    {name}</div>
                <div>
                    <ul className="no-bullets">
                        <li><QntyHandler name="Guitar Amps" qnty={amps}
                        /></li>
                        <li><QntyHandler name="Microphones" qnty={mics}/></li>
                    </ul>
                </div>
            </div>
        );
}
