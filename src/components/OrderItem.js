import React from 'react';
import {Redirect} from "react-router-dom";
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

export default class OrderItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: props.order,
            redirect: false
        }
    }

    render() {

        if (this.state.redirect)
            return <Redirect to={{pathname: '/order-inquiry', state: {order: this.state.order}}}/>;

        return <tr>
            <td className="text-left" style={{
                borderBottomLeftRadius: '0.5rem',
                borderTopLeftRadius: '0.5rem'
            }}>{this.state.order.siteManager.name}</td>
            <td>{this.state.order.date}</td>
            <th>Rs. {this.state.order.estimatedTotal}</th>
            <td style={{color: this.state.order.status === 'PENDING' ? 'green' : this.state.order.status === 'APPROVED' ? 'blue' : 'red'}}>{this.state.order.status}</td>
            <td style={{
                borderBottomRightRadius: '0.5rem',
                borderTopRightRadius: '0.5rem',
            }}>
                <Button className="button my-0" onClick={() => this.setState({redirect: true})} hidden={this.state.order.status === 'APPROVED'}>
                    <FontAwesomeIcon icon={faEdit}/>
                </Button>
            </td>
        </tr>

    }

}