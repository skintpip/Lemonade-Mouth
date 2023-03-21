// import React from 'react';
import './mainPage.css';
import React, {useEffect, useState, Component} from 'react';

/*
to do: Should be done by Wednesday 3/22
> render mainPage.html, render from the file or figure out how to copy the code onto render Done
> Login button onClick handler, enter the user into the database or sign in, decrypt and encrypt may be necessary

 */

//var perf =require('./mainPage.html');
class LoginPage extends React.Component {
    // handleLogin = () => {
    //     return(<body>HI</body>)
    // }
    render() {
        return (
            <body>
            <div class="login">
                <form id="login" method="get" action="login.php">
                    <div1>
                        <label1>
                            <b>User Name</b>
                        </label1>
                        <input type="text" name="Uname" id="Uname" placeholder="Username"></input>
                        <br></br><br></br>
                        <label2><b>Password
                        </b>
                        </label2>
                        <input type="Password" name="Pass" id="Pass" placeholder="Password"></input>
                        <br></br><br></br>
                        <input type="button" name="log" id="log" value="Login"></input>
                        <br></br><br></br>
                    </div1>
                </form>
            </div>
            </body>
        );
    }
}

export default LoginPage;
