import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown, Icon, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { logout } from "../../containers/User/store/actions"

import './style.css'

class Header extends Component {
    menu = (
        <Menu>
            <Menu.Item>
                <Link to="/userpage">
                    Profile
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/" onClick={this.props.logout}>
                    Logout
                </Link>
            </Menu.Item>
        </Menu>
    )

    render() {
        return (
            <div className="Header">
                <div className="Header-Body">
                    <div style={{width: '10%'}}>
                        <Link to="" style={{marginLeft: '20%'}}>
                            <img src={require('../../assets/images/logo.png')} alt="logo"
                                 style={{position: 'absolute', height: '90px', borderRadius: '3px', top: '0px'}}/>
                        </Link>
                    </div>
                    <div className="Header-Middle"/>
                    <div className="Header-Right">
                        {this.props.user.isAuth ?
                            <div className="Header-Navigator">
                                <Link className="Header-Link" to="/about">About</Link>
                                <Link className="Header-Link" to="/become-a-host">Host a home</Link>
                                <Dropdown overlay={this.menu}>
                                    <a className="Header-Link" href="/#">
                                        Hello {this.props.user.username} <Icon type="down"/>
                                    </a>
                                </Dropdown>
                            </div> :
                            <div className="Header-Navigator">
                                <Link className="Header-Link" to="/about">About</Link>
                                <Link className="Header-Link" to="/become-a-host">Host a home</Link>
                                <Link className="Header-Link" to="/register">Register</Link>
                                <Link className="Header-Link" to="/login">Login</Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => ({
    user: state.user
})
const actionCreators = {logout}
export default connect(mapStatetoProps, actionCreators)(Header)