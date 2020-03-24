import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import {connect} from 'react-redux'
import {FaUserCircle} from 'react-icons/fa'
import {FiShoppingCart} from 'react-icons/fi'
import {BukanHome,IniHome} from './../redux/actions'

class NavbarPage extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

 

    render() {
        console.log(this.props.Header)
        return (
            <MDBNavbar color="black" transparent={this.props.Header} scrolling className='bordernav' dark fixed='top' expand="md">
                <MDBNavbarBrand href='/'>
                    <strong className={'white-text'}>MiniMales</strong>
                </MDBNavbarBrand>

                <MDBNavbarToggler onClick={this.toggleCollapse} />

                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>

                <MDBNavbarNav tag='div' right className='mr-5' >
                    <MDBNavItem >
                        {
                            this.props.User.role==='admin'
                            ?
                            <div style={{display: "flex"}}>
                            <MDBNavLink to='/manageadmin'>Manage Admin</MDBNavLink>
                            <MDBNavLink to='/manage-transaksi'>Manage Transaksi</MDBNavLink>
                                {/* <MDBNavItem>
                                    <MDBNavLink to='/cart'>
                                        <FiShoppingCart style={{fontSize:20}}/> Cart 
                                    </MDBNavLink>
                                </MDBNavItem> */}
                                <MDBDropdown >
                                    <MDBDropdownToggle nav className='warnanav' >
                                        <FaUserCircle/> hallo, {this.props.User.username}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className='dropdown1' >
                                        {/* <MDBDropdownItem href="#!">Action</MDBDropdownItem> */}
                                        <MDBDropdownItem href="/change_password">Ubah Password</MDBDropdownItem>
                                        <MDBDropdownItem href="/" onClick={() => btnSignOut()} >Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </div>
                            :
                            null
                        }
                            
                    </MDBNavItem>
                    {/* <MDBNavItem>
                        <MDBNavLink to='/cart'>
                            <FiShoppingCart style={{fontSize:20}}/> Cart 
                        </MDBNavLink>
                    </MDBNavItem> */}
                    <MDBNavItem>
                        {
                            this.props.User.islogin
                            ?
                            null
                            :
                            <div style={{display: "flex"}}>
                                <MDBNavItem><MDBNavLink to='/login'>Login</MDBNavLink></MDBNavItem>
                                <MDBNavItem><MDBNavLink to='/register'>Daftar</MDBNavLink></MDBNavItem>
                            </div>
                            

                        }
                    </MDBNavItem>
            
                    <MDBNavItem>
                        {
                            // this.props.User.username
                            this.props.User.role==='user'
                            ?
                            <div style={{display: "flex"}}>
                                <MDBNavItem>
                                    <MDBNavLink to='/cart'>
                                        <FiShoppingCart style={{fontSize:20}}/> Cart 
                                    </MDBNavLink>
                                </MDBNavItem>
                                <MDBDropdown >
                                    <MDBDropdownToggle nav className='warnanav' >
                                        <FaUserCircle/> hallo, {this.props.User.username}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className='dropdown1' >
                                        {/* <MDBDropdownItem href="#!">Action</MDBDropdownItem> */}
                                        <MDBDropdownItem href="/change_password">Ubah Password</MDBDropdownItem>
                                        <MDBDropdownItem href="/" onClick={() => btnSignOut()} >Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </div>
                            :
                            null
                        }
                    </MDBNavItem>
                    
                    <MDBNavItem>
                    
                    </MDBNavItem>
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
            );
    }
}

const btnSignOut = () => {
    localStorage.clear()
    // window.location.reload()
}

const MapstatetoProps=(state)=>{
    return{
        User:state.Auth,
        Header:state.Header.ishome
    }
}
 
export default connect(MapstatetoProps,{IniHome,BukanHome})(NavbarPage);

