import React, {Component} from 'react';
import {Jumbotron, Button} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDollyFlatbed} from "@fortawesome/free-solid-svg-icons";

class Home extends Component {

    componentDidMount() {
        document.title = "PS | Home"
    }

    render() {

        return <div className="container-fluid px-0">
            <Jumbotron className="header">
                <h1 className="display-3" style={{fontSize: '4rem'}}>Procurement System&nbsp;<FontAwesomeIcon style={{transform: 'scale(-1, 1)', color:  'rgba(0, 128, 0, 1)'}} icon={faDollyFlatbed}/></h1>
                <p className="lead">Makes your life easier.</p>
                <hr className="my-2" />
                <p><span style={{fontSize: '2rem'}}>“</span>Understand what you are buying, and why, how it will affect your business, and what the potential risks are. That detailed understanding may be beyond the scope of a procurement department.<span style={{fontSize: '2rem'}}>”</span><br/> – Owen Williams</p>
                <p className="lead">
                    <Button className="button" color="primary">Learn More</Button>
                </p>
            </Jumbotron>
        </div>;

    }

}

export default Home;