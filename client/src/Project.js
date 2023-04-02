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
function HWSetHandler(props) {
    const projId = props.projId.replace(/\s/g, '');
    const [name, setName] = useState(props.name);
    const [qnty, setQnty] = useState(null);
    const [state, setState] = useState(0);
    const [buffer, setBuffer] = useState(null);
    const [msg, setMsg] = useState("Enter qnty");
    const [inputRef, setInputRef] = useState();


    useEffect(() => {
        let response;
        if(state === 0) {
            response = getAvailability(name);
            setState(10);
        } else if (state === -1) {
            checkOut(buffer);
            response = getAvailability(name);
            setState(10);
        } else if (state === 1) {
            checkIn(buffer);
            response = getAvailability(name);
            setState(10);
        }
        else return;
        response.then((data) => setQnty(data)).catch(error => console.log(error));
    }, [qnty]);
    async function getAvailability(hwSet) {
        let url = '/available/' + String(hwSet);
        const promise = fetch(url).then((response) => response.json()).then((qntyPromise) => qntyPromise.available).then((result) => {return result;});
        return promise;
    }

    async function checkOut(buffer) {
        let url = '/projects/checkedOut/' + name + '/' + projId + '/' + buffer;
        console.log(url);
        //trying to get checked out for Project 1, also returns a promise that has the value inside it
        fetch(url).then((response) => response.json())
            .then((checkedOut) => checkedOut.checkedOut);
    }

    async function checkIn(buffer) {
        let url = '/projects/checkedIn/' + name + '/' + projId + '/' + buffer;
        //trying to get checked out for Project 1, also returns a promise that has the value inside it
        fetch(url).then((response) => response.json())
            .then((checkedIn) => checkedIn.out.at(0));
    }

    /*steps:
    on create, we update availability
    on button push, refresh availability, check for valid input, then update client and backend*/
        return (
            <div className="qnty-section">
                <div>{name}: {qnty}</div>
                <TextField inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}} id="outlined-basic"
                           label={msg} variant="outlined" size="small" inputRef={ref => {
                    setInputRef(ref);
                }}/>
                <div><Button variant="contained" color="secondary" onClick={() => {
                   setBuffer(Number(inputRef.value));
                   setState(1);
                   setQnty(null);
                }}>
                    add Items</Button></div>
                <div><Button variant="contained" color="secondary" onClick={() => {
                    let newQnty = Number(qnty) - Number(inputRef.value);
                    if (newQnty < 0) {
                        setMsg("Please enter a qnty < current");
                    } else {
                        setBuffer(Number(inputRef.value));
                        setState(-1);
                        setQnty(null);
                    }
                }}>
                    remove Items</Button></div>
            </div>);
}

function ProjectMember(props) {
    const name = props.name;

        return (
            <div className="project-member">
                <div>
                    {name}</div>
                <div>
                    <ul className="no-bullets">
                        <li><HWSetHandler name="GuitarAmps" projId={name}
                        /></li>
                        <li><HWSetHandler name="Microphones" projId={name}/></li>
                    </ul>
                </div>
            </div>
        );
}
