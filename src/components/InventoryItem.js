import React from 'react';
import {Redirect} from "react-router-dom";

export default class InventoryItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        }
    }
    
    render() {

        if (this.state.redirect)
            return <Redirect to={{pathname: '/item', state: {item: this.state.item}}}/>;
        
        return <tr>
            <td className="text-left" style={{
                borderBottomLeftRadius: '0.5rem',
                borderTopLeftRadius: '0.5rem'
            }}>{this.state.item.name}</td>
            <td>{this.state.item.quantity}</td>
            <th style={{
                borderBottomRightRadius: '0.5rem',
                borderTopRightRadius: '0.5rem'
            }}>Rs. {this.state.item.unitPrice}</th>
        </tr>
        
    }

}