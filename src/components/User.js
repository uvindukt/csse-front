import React, { Component } from "react";
import {
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
    FormGroup,
    FormText
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faUser,
    faPhone,
    faLock
} from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";
import Alert from "./Alert";

const types = ["SITE MANAGER", "ACCOUNTANT", "MANAGER"];

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            type: "SITE MANAGER",
            telephone: "",
            alert: false,
            alertText: null
        };
    }

    componentDidMount() {
        document.title = "PS | User";
    }

    resetAlert = () => {
        this.setState({
            alert: false,
            alertText: null
        });
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {

        event.preventDefault();

        const packet = {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "x-authorize-token": this.props.session.token,
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                type: this.state.type,
                telephone: this.state.telephone
            })
        };

        fetch("http://localhost:5000/api/user", packet)
            .then(result => result.json())
            .then(data => {
                data.success
                    ? this.setState({ alert: true, alertText: data.success })
                    : this.setState({ alert: true, alertText: data.msg });
                return data;
            })
            .catch(err => console.error(err));
    };

    render() {

        if (!this.props.session.isAuthenticated) return <Redirect to="/"/>;

        let alert = "";
        if (this.state.alert)
            alert = <Alert alertText={this.state.alertText} resetAlert={this.resetAlert}/>;

        return (
            <div className="container-fluid row mx-0">
                <Col md={3}/>
                <Col md={6} className="container-fluid text-center">
                    <h1 className="mt-4 mb-4 text-success">Add User</h1>
                    <hr/>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mr-0">
                            <div className="row container-fluid mr-0 pr-0">
                                <Col md={6} className="mb-4">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="adTextBox">
                                                <FontAwesomeIcon icon={faUser}/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            autoComplete="off"
                                            required
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                            className="textBox"
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md={6} className="mb-0">
                                    <FormGroup className="text-left">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="adTextBox">
                                                    <FontAwesomeIcon icon={faUser}/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                value={this.state.type}
                                                onChange={this.handleChange}
                                                className="select"
                                                type="select"
                                                name="type"
                                            >
                                                {
                                                    types.map(type => <option key={type} value={type}>{type}</option>)
                                                }
                                            </Input>
                                        </InputGroup>
                                        <FormText className="ml-3">Please select an user type.</FormText>
                                    </FormGroup>
                                </Col>
                            </div>
                            <div className="row container-fluid mr-0 pr-0">
                                <Col md={12} className="mb-0">
                                    <FormGroup className="text-left">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="adTextBox">
                                                    <FontAwesomeIcon icon={faEnvelope}/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                autoComplete="off"
                                                required
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                className="textBox"
                                                type="email"
                                                name="email"
                                                placeholder="E-Mail"
                                            />
                                        </InputGroup>
                                        <FormText className="ml-3">Please enter a valid email address.</FormText>
                                    </FormGroup>
                                </Col>
                            </div>
                            <div className="row container-fluid mr-0 pr-0">
                                <Col md={12} className="mb-4 text-center">
                                    <Button className="button" style={{width: '100%'}}>
                                        Register
                                    </Button>
                                </Col>
                            </div>
                        </div>
                    </form>
                </Col>
                <Col md={3}/>
                {alert}
            </div>
        );
    }
}

export default User;
