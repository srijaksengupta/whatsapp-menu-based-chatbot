import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';

const MenuItem = props => (
    <div style={{ marginTop: '35px'}}>
    <Card className="text-center">
        <Card.Header><h4>Command: {props.menuItem.command}</h4></Card.Header>
        <Card.Body>
            <Card.Title>Command Type : {props.menuItem.commandType}</Card.Title>
            <Card.Text>
                <Form.Group controlId="Form.MessageText">
                    <Form.Control as="textarea" rows={5} style={{whiteSpace: 'pre'}} value={props.menuItem.messageText} readOnly/>
                </Form.Group>
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
            <Link to={"/edit/"+props.menuItem._id}><Button variant="outline-secondary">edit</Button></Link> | <a href="/" onClick={() => { props.deleteMenuItem(props.menuItem._id) }}><Button variant="outline-danger">delete</Button></a>
        </Card.Footer>
    </Card>
    </div>
  )

export default class MenuItemList extends Component {

    constructor(props) {
        super(props);
    
        this.deleteMenuItem = this.deleteMenuItem.bind(this)
    
        this.state = {menuItems: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/menuItem/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({menuItems: response.data})
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    async deleteMenuItem(id) {
        
        await axios.delete('http://localhost:5000/menuItem/'+id)
          .then(res => { console.log(res.data)});
    
        await this.setState({
            menuItems: this.state.menuItems.filter(el => el._id !== id)
        })
      }

    menuItemList() {
        return this.state.menuItems.map(currentmenuItem => {
            return <MenuItem menuItem={currentmenuItem} deleteMenuItem={this.deleteMenuItem} key={currentmenuItem._id}/>;
        })
    }

    render() {
        return (
        <div>
            <div>
                <h3>Menu Item List</h3>
            </div>
            <div>
                { this.menuItemList() }
            </div>
            <div style={{position: 'absolute', left: '50%', transform: 'translate(-50%)', marginTop: '20px'}}>
                <Link to="/create" className="nav-link"><Button variant="outline-success">Add Menu Item</Button></Link>
            </div>
        </div>
      )
    }
}