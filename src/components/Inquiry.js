import React from 'react';
import {Container, Row, Col, Table, Spinner} from 'reactstrap';
import Alert from "./Alert";
import {Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardList} from "@fortawesome/free-solid-svg-icons";
import OrderItem from "./OrderItem";

export default class Inventory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            alert: false,
            alertText: null
        }
    }

    componentDidMount() {
        document.title = "PS | Inquiry";
        fetch('http://localhost:5000/api/order')
            .then(response => response.json())
            .then(result => result.orders.length > 0
                ? this.setState({orders: result.orders})
                : this.setState({orders: null})
            )
            .catch(err => console.log(err))
    }

    render() {

        if (!this.props.session.isAuthenticated) return <Redirect to="/"/>;

        let alert = "";
        if (this.state.alert)
            alert = <Alert alertText={this.state.alertText} resetAlert={this.resetAlert}/>;

        let items = "";
        if (this.state.orders.length === null) {

            items = <div className="mt-4 text-success">
                <span style={{ fontSize: "2rem" }}>No orders.</span>
            </div>;

        } else if (this.state.orders.length === 0) {

            items = <div className="mt-4 text-success text-center">
                <span style={{ fontSize: "2rem" }}>Loading</span>&emsp;
                <Spinner size="lg"/>
            </div>;

        } else {

            items = <div className="comp pt-4 pb-3 p-2 mb-4">
                <Table className="merchantTable text-center" striped borderless responsive>
                    <thead>
                    <tr>
                        <th>Site Manager</th>
                        <th>Date</th>
                        <th>Estimate Total</th>
                        <th>Status</th>
                        <th>Inquiry</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.orders.map(order =>
                            <OrderItem key={order._id} order={order}/>
                        )
                    }
                    </tbody>
                </Table>
            </div>;

        }

        return <Container>
            <Row>
                <Col md={12}>
                    <h1 className="mt-4 mb-4 text-success text-center">
                        <FontAwesomeIcon icon={faClipboardList}/>
                        &ensp;Orders
                    </h1>
                    <hr/>
                    {items}
                </Col>
            </Row>
            {alert}
        </Container>

    }

}