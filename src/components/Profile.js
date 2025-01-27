import React, { Component } from "react";
import {
    Col,
    Button,
    Row,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faKey,
    faUser,
    faEdit,
    faUserEdit
} from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";
import ProfilePrompt from "./ProfilePrompt";
import { read_cookie } from "sfcookies";

class Profile extends Component {
    constructor(props) {
        super(props);
        if (this.props.session.user) {
            const { name, email, telephone } = this.props.session.user;
            this.state = {
                prompt: false,
                promptText: null,
                URI: `http://localhost:5000/api/user/email/${email}`,
                type: this.props.session.type,
                token: this.props.session.token,
                name,
                email,
                telephone
            };
        }
    }

    componentDidMount() {
        document.title = "UniHub | Profile";
    }

    resetPrompt = () => {
        const cookie = read_cookie("session");
        this.setState({
            id: cookie.user._id,
            name: cookie.user.name,
            email: cookie.user.email,
            telephone: cookie.user.telephone,
            token: cookie.token,
            type: cookie.type,
            prompt: false,
            promptText: null
        });
    };

    renderPrompt = content => {
        this.setState({
            prompt: true,
            promptText: content
        });
    };

    render() {
        if (!this.props.session.isAuthenticated) return <Redirect to="/"/>;

        let { name, email } = this.state;

        let prompt = null;
        if (this.state.prompt)
            prompt = <ProfilePrompt promptText={this.state.promptText} type={this.state.type} login={this.props.login}
                                    URI={this.state.URI} token={this.state.token}
                                    resetPrompt={this.resetPrompt}/>;

        return (
            <div className="container-fluid row mx-0 text-center">
                <Col md={2}/>
                <Col md={8}>
                    <h1 className="mt-4 mb-4 text-success"><FontAwesomeIcon icon={faUserEdit}/>&ensp;Profile</h1>
                    <hr className="mb-4"/>
                    <ListGroup>
                        <ListGroupItem className="text-left">
                            <Row>
                                <Col md={6}>
                                    <ListGroupItemHeading><FontAwesomeIcon
                                        icon={faUser}/>&emsp;Name</ListGroupItemHeading>
                                    <ListGroupItemText className="text-muted mt-2 my-0">{name}</ListGroupItemText>
                                </Col>
                                <Col md={6} className="text-right">
                                    <Button
                                        onClick={() => this.renderPrompt('name')}
                                        className="button m-0 mt-2 py-1"><FontAwesomeIcon
                                        icon={faEdit}/></Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem className="text-left">
                            <Row>
                                <Col md={6}>
                                    <ListGroupItemHeading><FontAwesomeIcon
                                        icon={faEnvelope}/>&emsp;E-Mail</ListGroupItemHeading>
                                    <ListGroupItemText className="text-muted mt-2 my-0">{email}</ListGroupItemText>
                                </Col>
                                <Col md={6} className="text-right">
                                    <Button
                                        onClick={() => this.renderPrompt('email')}
                                        className="button m-0 mt-2 py-1"><FontAwesomeIcon
                                        icon={faEdit}/></Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem className="text-left">
                            <Row>
                                <Col md={6}>
                                    <ListGroupItemHeading><FontAwesomeIcon icon={faKey}/>&emsp;Password</ListGroupItemHeading>
                                    <ListGroupItemText className="text-muted mt-2 my-0">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</ListGroupItemText>
                                </Col>
                                <Col md={6} className="text-right">
                                    <Button
                                        onClick={() => this.renderPrompt('password')}
                                        className="button m-0 mt-2 py-1"><FontAwesomeIcon
                                        icon={faEdit}/></Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={2}/>
                {prompt}
            </div>
        );
    }
}

export default Profile;
