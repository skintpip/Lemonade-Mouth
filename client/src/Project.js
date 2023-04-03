import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Link, useActionData, useSubmit} from "react-router-dom";
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
    const submit = useSubmit();
    const [projId, setProjId] = useState("");
    const [state, setState] = useState(null);
    const [msg, setMsg] = useState("");


    useEffect(() => {
        if (state === null) {
            setState(10);
        }
        else if(state === 1) {
            let ret = joinProject();
            ret.then((result) => {
            if (result === "error") {
                setMsg("error: Either project doesn't exist, or user is already in project.")
            } else {
                let formData = new FormData();
                formData.append("username", username);
                formData.append("password", password);
                submit(formData, {method: "post", action: "/projectPage/"});
            }
            setState(10);
            })
        } else if (state === 2) {
            let ret = leaveProject();
            ret.then((result) => {
            if (result === "error") {
                setMsg("error: User is not in project.")
            } else {
                let formData = new FormData();
                formData.append("username", username);
                formData.append("password", password);
                submit(formData, {method: "post", action: "/projectPage/"});
            }
            setState(10);
            })
        } else if (state === 3) {
            let ret = createProject();
            ret.then((result) => {
            if (result === "error") {
                setMsg("error: Project already exists")
            } else {
                let formData = new FormData();
                formData.append("username", username);
                formData.append("password", password);
                submit(formData, {method: "post", action: "/projectPage/"});
            }
            setState(10);
            })
        }
    }, [state]);


    const RenderMembers = () => {
        return projects.map((component, index) =>
            <React.Fragment key={index}>
                <ProjectMember name={component}/>
            </React.Fragment>
        );
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setProjId(value);
    };

    const passData = (event) => {
        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        submit(formData, {method: "post", action:"/newProject/"});
    };

    async function joinProject() {
        const url = '/join/' + username + '/' + projId;
        console.log(url);
        return fetch(url).then((response) => response.json())
            .then((result) => {
                return result.result;
            });
    }
    async function createProject() {
        let url = '/create/' + projId;
        return fetch(url).then((response) => response.json()).then((result) => {
            return result.result;
        });
    }

    async function leaveProject() {
        const url = '/leave/' + username + '/' + projId;
        console.log(url);
        return fetch(url).then((response) => response.json())
            .then((result) => {
                console.log()
                return result.result;
            });
    }


    return (
        <div className="project">
            <Title> {Title()} </Title>
            <div>{msg}</div>
            <div>{RenderMembers()}</div>
            <Button variant="contained" color="secondary"  onClick={passData}> New Project </Button>
            <div>
                <input type="text" name="projId" variant="filled" placeholder="ProjectID" onChange={handleChange}/>
                <Button variant="contained" color="secondary" onClick={() => setState(1)}> Join Project </Button>
                <Button variant="contained" color="secondary" onClick={() => setState(2)}> Leave Project </Button>
                <Button variant="contained" color="secondary" type="submit" onClick={() => setState(3)}>Create Project</Button>

            </div>


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
        try {
            if (state === 0) {
                response = getCheckedOut(projId);
                setState(10);
            } else if (state === -1) {
                response = checkOut(buffer).catch((error) => console.log(error));
                setState(10);
            } else if (state === 1) {
                response = checkIn(buffer).catch((error) => console.log(error));
                setState(10);
            } else return;
            response.then((data) => {

                setQnty(data)
            });
        } catch (error) {
            console.log(error);
        }
    }, [qnty]);

    async function getCheckedOut(projId) {
        let url = '/projects/checkedOut/' + projId;
        return fetch(url).then((response) => response.json()).then((checkedOut) => checkedOut.out).then((result) => {
            console.log(result);
            if (name === "GuitarAmps")
                return result.at(0);
            else return result.at(1);
        });
    }

    async function checkOut(buffer) {
        let url = '/checkedOut/' + name + '/' + projId + '/' + buffer;
        //trying to get checked out for Project 1, also returns a promise that has the value inside it
        return fetch(url).then((response) => response.json())
            .then((checkedOut) => {
                let result = checkedOut.checkedOut;
                if (name === "GuitarAmps")
                    return result.at(0);
                else return result.at(1);
            });
    }

    async function checkIn(buffer) {
        let url = '/checkedIn/' + name + '/' + projId + '/' + buffer;
        //trying to get checked out for Project 1, also returns a promise that has the value inside it
        return fetch(url).then((response) => response.json())
            .then((checkedIn) => {
                let result = checkedIn.checkedIn;
                if (name === "GuitarAmps")
                    return result.at(0);
                else return result.at(1);
            });
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
                setState(-1);
                setQnty(null);
            }}>
                add Items</Button></div>
            <div><Button variant="contained" color="secondary" onClick={() => {
                let newQnty = Number(qnty) - Number(inputRef.value);
                if (newQnty < 0) {
                    setMsg("Please enter a qnty < current");
                } else {
                    setBuffer(Number(inputRef.value));
                    setState(1);
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
