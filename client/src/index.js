import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {Login} from './Login';
import {Project} from './Project';
import {Register} from './Register';
import {
    createBrowserRouter, json,
    RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path:"projectPage/",
        element: <Project/>,
        action: async ({request}) => {
            const params = await request.formData();
            console.log(request.method);
            let url = '/login/' + params.get("username") + '/' + params.get("password");
            const list = fetch(url).then((response) => response.json())
                .then(async (userName) => {
                    url = '/projects/' + userName.username;
                    return await fetch(url)
                        .then((response) => response.json())
                        .then((projectsList) => projectsList.projects)
                }).catch((err) => {return null});
            return list.then((result) => {
                const map = new Map();
                map.set('user', params.get('username'));
                map.set('password', params.get('password'));
                map.set('projects', result);
                return map;
            })
        }
    },
    {
        path:"register/",
        element: <Register />,
        action: async({request}) => {
            const params = await request.formData();
            return params;
        }
    }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.style.background = "linear-gradient(79deg, #7439db, #C66FBC 48%, #F7944D)";
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();