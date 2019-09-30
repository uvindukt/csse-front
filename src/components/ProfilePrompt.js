import React, { Component } from "react";
import {
    Button, Col,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faGraduationCap, faKey, faLock, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import Alert from "./Alert";

class ProfilePrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            alert: false,
            alertText: null
        };
    }

    resetAlert = () => {
        this.setState({
            alert: false,
            alertText: null
        });
        this.props.resetPrompt();
    };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        const packet = {
            method: "PUT",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "x-authorize-token": this.props.token,
                "x-authorize-type": this.props.type
            },
            body: JSON.stringify(this.state)
        };

        fetch(this.props.URI, packet)
            .then(result => result.json())
            .then(data => {
                if (data.success) {
                    this.props.login({
                        isAuthenticated: true,
                        user: data.user,
                        token: this.props.token,
                        type: this.props.type
                    });
                    data.msg = data.success;
                }
                return data;
            })
            .then(data => this.setState({ alert: true, alertText: data.msg }))
            .catch(err => console.error(err));
    };

    render() {
        const { promptText, resetPrompt } = this.props;

        let alert = "";
        if (this.state.alert)
            alert = <Alert alertText={this.state.alertText} resetAlert={this.resetAlert}/>;

        let input = "";

        switch (promptText) {
            case ('name'): 
                input = <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="adTextBox">
                            <FontAwesomeIcon icon={faUser}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        id="input"
                        autoComplete="off"
                        required
                        onChange={this.handleChange}
                        className="textBox"
                        type="text"
                        name="name"
                        placeholder="Name"
                    />
                </InputGroup>;
            break;
            case ('email'):
                input = <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="adTextBox">
                            <FontAwesomeIcon icon={faEnvelope}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        id="input"
                        autoComplete="off"
                        required
                        onChange={this.handleChange}
                        className="textBox"
                        type="email"
                        name="email"
                        placeholder="E-Mail"
                    />
                </InputGroup>;
            break;
            case ('telephone'):
                input = <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="adTextBox">
                            <FontAwesomeIcon icon={faPhone}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        id="input"
                        autoComplete="off"
                        required
                        onChange={this.handleChange}
                        className="textBox"
                        type="text"
                        name="telephone"
                        placeholder="Telephone"
                    />;
                </InputGroup>;
            break;
            case ('password'):
                input = <div className="container-fluid mx-0">
                    <div className="row container-fluid mx-0">
                        <Col md={12} className="mb-4">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText className="adTextBox">
                                        <FontAwesomeIcon icon={faLock}/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    id="currentPassword"
                                    required
                                    onChange={this.handleChange}
                                    className="textBox"
                                    type="password"
                                    name="currentPassword"
                                    placeholder="Current Password"
                                />
                            </InputGroup>
                        </Col>
                    </div>
                    <div className="row container-fluid mx-0">
                        <Col md={12} className="mb-4">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText className="adTextBox">
                                        <FontAwesomeIcon icon={faKey}/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    id="password"
                                    required
                                    onChange={this.handleChange}
                                    className="textBox"
                                    type="password"
                                    name="password"
                                    placeholder="New Password"
                                />
                            </InputGroup>
                        </Col>
                    </div>
                    <div className="row container-fluid mx-0">
                        <Col md={12} className="mb-4">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText className="adTextBox">
                                        <FontAwesomeIcon icon={faKey}/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    id="confirmPassword"
                                    required
                                    onChange={this.handleChange}
                                    className="textBox"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                />
                            </InputGroup>
                        </Col>
                    </div>
                </div>;
            break;
            default:
                input = <React.Fragment/>;
                    
                    
        }

        return (
            <Modal
                centered
                fade={false}
                modalTransition={{ timeout: 1000 }}
                isOpen={this.state.modal}
                toggle={() => {
                    this.toggle();
                    resetPrompt();
                }}
                className="modalPrompt">
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                        resetPrompt();
                    }}
                    charCode="⨉">
                    <div className="navbar-brand">
                        UniHub&ensp;
                        <FontAwesomeIcon
                            style={{ transform: "scale(-1, 1)", color: "rgba(0, 128, 0, 1)" }}
                            icon={faGraduationCap}
                        />
                    </div>
                </ModalHeader>
                <ModalBody>{input}</ModalBody>
                <ModalFooter>
                    <Button onClick={this.handleSubmit} className="button my-0 py-1">
                        Update
                    </Button>
                    &emsp;
                    <Button
                        className="button my-0 py-1"
                        onClick={() => {
                            this.toggle();
                            resetPrompt();
                        }}>
                        Cancel
                    </Button>
                </ModalFooter>
                {alert}
            </Modal>
        );
    }
}

export default ProfilePrompt;
