import {Form, redirect} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {create} from "@mui/material/styles/createTransitions";
import Button from "@mui/material/Button";

export function NewProjectForm() {  //called when creating a new project
    const [name, setName] = useState("");
    const [state, setState] = useState(null);

    const handleChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
async function createProject(projId) {
        let url = '/create/' + projId;
        return fetch(url).then((response) => response.json()).then((project) => {
            if(project.success ==="success"){
                console.log("Project Successfully Create")
            }else{
                console.log("Project already exists")
            }
        });
    }
useEffect(() =>{
    if(state === 1){
        let response;
        response = createProject(name);

    }


    }, [state]);
    return (
        <Form>
            <input type="text" name="Project ID" variant="filled" onChange={handleChange}/>
            <Button variant="contained" color="secondary" type="submit" onClick={() => setState(1) }>Create Project</Button>
        </Form>

    )
}