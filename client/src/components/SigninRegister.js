import React from "react"
import { Grid, Divider, Segment} from 'semantic-ui-react'
import Login from './Login'
import Signup from './Signup'
import { useHistory } from "react-router-dom";
import { checkUser } from "./actions/rootActions"

function SigninRegister() {

    const history = useHistory()

    function handleRoute(data) {
        checkUser(data)
        history.push('/')
    }
    
    return (
        <>          
        <Segment placeholder style={{backgroundColor:"#1a1f22"}}>
            <Grid stackable relaxed='very' columns={2} >
                <Grid.Column> 
                  <Login handleRoute={handleRoute}/>
                </Grid.Column>                 
                <Grid.Column verticalAlign='middle'>
                    <Signup handleRoute={handleRoute}/>
                </Grid.Column>   
            </Grid>
            <Divider style={{color:"white"}}vertical>Or</Divider>
            </Segment>
        </>
    );
};

export default SigninRegister

