import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class EditMenuItem extends Component {
  
    constructor(props) {
      super(props);

      this.onChangeCommand = this.onChangeCommand.bind(this);
      this.onChangeCommandType = this.onChangeCommandType.bind(this);
      this.onChangeMessageText = this.onChangeMessageText.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        command : -1,
        commandType : 'Text message',
        messageText : '',
        commandTypes: ['Text message']
      }
    }

    componentDidMount() {
      axios.get('http://localhost:5000/menuItem/'+this.props.match.params.id)
        .then(response => {
          this.setState({
            command: response.data.command,
            commandType: response.data.commandType,
            messageText: response.data.messageText
          })   
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    onChangeCommand(e) {
      this.setState({
        command: e.target.value
      })
    }
  
    onChangeCommandType(e) {
      this.setState({
        commandType: e.target.value
      })
    }
  
    onChangeMessageText(e) {
      this.setState({
        messageText: e.target.value
      })
    }

  onSubmit(e) {
    e.preventDefault();

    const menuItem = {
      command: this.state.command,
      commandType: this.state.commandType,
      messageText: this.state.messageText
    }

    console.log(menuItem);

    axios.post('http://localhost:5000/menuItem/update/' + this.props.match.params.id, menuItem)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Menu Item</h3>
      <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="Form.Command">
              <Form.Label>Command:</Form.Label>
              <Form.Control type="number" value={this.state.command} onChange={this.onChangeCommand} />
            </Form.Group>
            <Form.Group controlId="Form.CommandType">
              <Form.Label>Command Type: </Form.Label>
              <Form.Control as="select" value={this.state.commandType} onChange={this.onChangeCommandType}>
                {
                  this.state.commandTypes.map(function(commandtype) {
                    return <option 
                      key={commandtype}
                      value={commandtype}>{commandtype}
                      </option>;
                  })
                }
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="Form.MessageText">
              <Form.Label>Message Text: </Form.Label>
              <Form.Control as="textarea" rows={3} value={this.state.messageText} style={{whiteSpace: 'pre'}} onChange={this.onChangeMessageText} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
    </div>
    )
  }
}