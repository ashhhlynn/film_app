import React, { useState } from 'react';
import { Form, Label } from 'semantic-ui-react';

const Login = ({ handleRoute }) => {
    const [state, setState] = useState({email: '', password: ''});

    const handleChange = (event) => {
        setState({...state, [event.target.id]: event.target.value})
    };

    const handleSubmit = (event, loginData) => {
        event.preventDefault()
        fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: loginData.email, 
                password: loginData.password
            })
        })
        .then((response) => response.json())
        .then(data => {
            if (data.errors) {
                window.alert("Login failed.")
            }
            else {
                window.alert("Login successful.")
                handleRoute()
            }
        })
    };
    
    return (
        <>                               
        <h2 style={{fontFamily:"Helvetica"}}>Sign In</h2>
        <Form onSubmit={ (event) => { handleSubmit(event, state)}}>
            <Form.Input
                required
                id="email"
                placeholder="Email"
                value={state.email} 
                onChange={handleChange}
            />               
            <Form.Input
                required
                id="password"
                placeholder="Password"
                type="password"
                value={state.password} 
                onChange={handleChange}
            /> 
            <Form.Button size="tiny" circular content='Submit'/>
        </Form>               
        <br/>
        No account? Sign in with the <Label size="mini" style={{color:"black", cursor:"pointer", fontSize:"11px", fontWeight:"normal", backgroundColor:"#cdcdff"}} onClick={(e) => handleSubmit(e, {email:'ashley@gmail.com', password:'tnns12345'})}>Demo</Label>
        </>
    );
};

export default Login;