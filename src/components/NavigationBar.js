import React, {Component} from "react";
import {NavLink as Link} from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHardHat,
    faClipboardList,
    faUserTie,
    faPowerOff,
    faWarehouse,
    faUsers,
    faClipboardCheck,
    faBell,
    faStream,
    faDollyFlatbed
} from "@fortawesome/free-solid-svg-icons";

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggle = () => this.setState({isOpen: !this.state.isOpen});

    render() {
        const {isAuthenticated, user, type} = this.props.session;
        let auth, icon, username, drop;

        if (type === "MANAGER") {
            icon = <FontAwesomeIcon icon={faUserTie}/>;
            username = user.name;
        } else if (type === "ACCOUNTANT") {
            icon = <FontAwesomeIcon icon={faUserTie}/>;
            username = user.name;
        } else if (type === "SITE MANAGER") {
            username = user.name;
            icon = <FontAwesomeIcon icon={faHardHat}/>;
        }

        if (!isAuthenticated) {
            auth = (
                <React.Fragment>
                    <NavItem>
                        <Link
                            to="/login"
                            activeClassName="active"
                            className="nav-link mx-1">
                            &ensp;LOGIN
                        </Link>
                    </NavItem>
                </React.Fragment>
            );

            drop = "";

        } else if (isAuthenticated) {
            auth = (
                <React.Fragment>
                    <NavItem>
                        <Link to="/profile" className="nav-link mx-2">
                            <span className="text-success">{icon}&ensp;
                                {type.toUpperCase()}</span> | <span className="text-primary">{username}</span>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link
                            to="#"
                            onClick={this.props.logout}
                            activeClassName="active"
                            className="nav-link mx-1">
                            <FontAwesomeIcon icon={faPowerOff}/>
                        </Link>
                    </NavItem>
                </React.Fragment>
            );

            if (type === "SITE MANAGER") {
                drop = (<UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Options
                    </DropdownToggle>
                    <DropdownMenu right>
                            <Link exact to="/inquiry">
                                <DropdownItem className="navbar-brand">
                                <span style={{color: '#5cb85c', fontSize: 'large'}}>
                                <FontAwesomeIcon
                                    icon={faClipboardList}
                                />
                                    &ensp;Inquiry
                                </span>
                                </DropdownItem>
                            </Link>
                            <Link exact to="/order">
                                <DropdownItem className="navbar-brand">
                                <span style={{color: '#5cb85c', fontSize: 'large'}}>
                                <FontAwesomeIcon
                                    icon={faClipboardCheck}
                                />
                                    &ensp;Order
                                </span>
                                </DropdownItem>
                            </Link>
                            <Link exact to="/inventory">
                                <DropdownItem className="navbar-brand">
                                <span style={{color: '#5cb85c', fontSize: 'large'}}>
                                <FontAwesomeIcon
                                    icon={faWarehouse}
                                />
                                    &ensp;Inventory
                                </span>
                                </DropdownItem>
                            </Link>
                        <DropdownItem divider/>
                            <Link exact to="/user">
                                <DropdownItem className="navbar-brand">
                                <span style={{color: '#F00', fontSize: 'large'}}>
                                <FontAwesomeIcon
                                    icon={faUsers}
                                />
                                    &emsp;User
                                </span>
                                </DropdownItem>
                            </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>);
            } else if (type === "MANAGER") {
                drop = (<UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Options
                    </DropdownToggle>
                    <DropdownMenu right>
                        <Link exact to="/user">
                            <DropdownItem className="navbar-brand">
                                <span style={{color: '#F00', fontSize: 'large'}}>
                                <FontAwesomeIcon
                                    icon={faUsers}
                                />
                                    &emsp;User
                                </span>
                            </DropdownItem>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>);
            } else {
                drop = (<UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Options
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <Link exact to="/student/courses/enrolled" className="navbar-brand">
                                <span style={{color: '#5cb85c', fontSize: 'large'}}>
                                <FontAwesomeIcon
                                    icon={faClipboardCheck}
                                />
                                    &ensp;Enrolled Courses
                                </span>
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link exact to="/student/courses/all" className="navbar-brand">
                                <span style={{color: '#5cb85c', fontSize: 'large'}}>
                                <FontAwesomeIcon
                                    icon={faStream}
                                />
                                    &ensp;All Courses
                                </span>
                            </Link>
                        </DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>
                            <Link exact to="/notifications" className="navbar-brand">
                                <span style={{color: '#428bca', fontSize: 'large'}}>
                                <FontAwesomeIcon
                                    icon={faBell}
                                />
                                    &ensp;Notifications
                                </span>
                            </Link>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>);
            }
        }

        return (
            <Navbar color="white" light expand="md" className="navBar">
                <Link exact to="/" className="navbar-brand">
                    Procurement System&ensp;
                    <FontAwesomeIcon
                        style={{transform: "scale(-1, 1)", color: "rgba(0, 128, 0, 1)"}}
                        icon={faDollyFlatbed}
                    />
                </Link>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {auth}
                        {drop}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;
