import React, { Component } from 'react'
import { Icon, Menu, Modal } from 'semantic-ui-react'
import UserPage from '../UserProfile/UserPage'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from "../actions/rootActions"

class Navbar extends Component {
    state = {
        modalOpen: false
    }
    
    handleLogout = () => {
        fetch("/logout", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        this.props.logOut()
    }    
    
    handleOpen = () => {
        this.setState({ modalOpen: true })
    }
    
    handleClose = () => {
        this.setState({ modalOpen: false })
    }
    
    changeUserShow = (userShow) => {
        this.props.changeUserShow(userShow)
        this.handleClose()
    }
    
    render() {
        return (
            <Menu className="nav">
                <Menu.Menu icon='labeled' style={{marginLeft:"4%", marginTop:"1%"}} position="left"><br></br>
                    <h1><Link to='/'>Boxd.</Link></h1>
                </Menu.Menu>
                <Menu.Menu style={{marginRight:"3%"}} position='right'>
                    {this.props.currentUser.length === 0 ?
                        <>
                        <Menu.Item style={{color:"#c7c7ff ", letterSpacing:".25px"}}><Link to='/login'><Icon size="big" name="user circle outline"/></Link></Menu.Item>
                        </>
                    :
                        <>
                        <Menu.Item style={{color:"#c7c7ff ", letterSpacing:".25px"}}><Link to='/userdiary'><Icon name="user circle" size="large" style={{ marginTop:"2%"}}/></Link> Diary</Menu.Item>
                        <Menu.Item style={{color:"#c7c7ff ", letterSpacing:".25px"}}><Link to='/watchlist'><Icon name="eye" size="large" style={{ marginTop:"2%"}}/></Link> Watch</Menu.Item>
                        <Menu.Item style={{color:"#c7c7ff ", letterSpacing:".25px"}}><Icon name="address book outline" onClick={this.handleOpen} size="large" style={{color:"#c7c7ff ", cursor:"pointer"}}/>Friends</Menu.Item>
                        <Menu.Item style={{color:"#c7c7ff ", letterSpacing:".25px"}}><Link to='/'><Icon size="large" onClick={this.handleLogout} name="power off"/></Link></Menu.Item>
                        </>
                    }
                    <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon>
                        <Modal.Content>
                            <UserPage addFollowFilms={this.props.addFollowFilms} removeFollowFilms={this.props.removeFollowFilms} changeUserShow={this.changeUserShow} currentUser={this.props.currentUser}/>
                        </Modal.Content>
                    </Modal>
                </Menu.Menu>
            </Menu>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        logOut: () => { dispatch(logOut()) }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)