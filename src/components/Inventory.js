import React from 'react';
import {Container, Row, Col, Table, Spinner} from 'reactstrap';
import Alert from "./Alert";
import {Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWarehouse} from "@fortawesome/free-solid-svg-icons";
import InventoryItem from "./InventoryItem";

export default class Inventory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            alert: false,
            alertText: null
        }
    }

    componentDidMount() {
        document.title = "PS | Inventory";
        fetch('http://localhost:5000/api/item')
            .then(response => response.json())
            .then(result => result.items.length > 0
                ? this.setState({items: result.items})
                : this.setState({items: null})
            )
            .catch(err => console.log(err))
    }

    render() {

        if (!this.props.session.isAuthenticated) return <Redirect to="/"/>;

        let alert = "";
        if (this.state.alert)
            alert = <Alert alertText={this.state.alertText} resetAlert={this.resetAlert}/>;

        let items = "";
        if (this.state.items.length === null) {

            items = <div className="mt-4 text-success">
                <span style={{ fontSize: "2rem" }}>Inventory is empty.</span>
            </div>;

        } else if (this.state.items.length === 0) {

            items = <div className="mt-4 text-success text-center">
                <span style={{ fontSize: "2rem" }}>Loading</span>&emsp;
                <Spinner size="lg"/>
            </div>;

        } else {

            items = <div className="comp pt-4 pb-3 p-2 mb-4">
                <Table className="merchantTable text-center" striped borderless responsive>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.items.map(item =>
                            <InventoryItem key={item._id} item={item}/>
                        )
                    }
                    </tbody>
                </Table>
            </div>;

        }

        return <Container>
            <Row>
                <Col md={2}/>
                <Col md={8}>
                    <h1 className="mt-4 mb-4 text-success text-center">
                        <FontAwesomeIcon icon={faWarehouse}/>
                        &ensp;Inventory
                    </h1>
                    <hr/>
                    {items}
                </Col>
                <Col md={2}/>
            </Row>
            {alert}
        </Container>

    }

}