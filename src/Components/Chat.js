import React, { Component } from 'react'
import {Container, Row, Col, Card, CardBody, CardTitle, CardFooter, InputGroup, InputGroupAddon, Button, Input} from 'reactstrap';
import io from 'socket.io-client';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            message: '',
            messages: []
        }
        this.socket = io('192.168.0.11:8080');
        this.socket.on('RECIEVE_MESSAGE', (data) => {
            addMessage(data);
        });

        this.sendMessage = (e) => {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.name,
                message: this.state.message
            })
            this.setState({
                message: ''
            })
        }

        const addMessage = (data) => {
            this.setState({
                messages: [
                    ...this.state.messages,
                    data
                ]
            })
        }
    }

    grabInput = (param, e) => {
        this.setState({
            [param]: e.target.value
        })
    }

    render() {
        return (
            <Container >
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle>Chat App</CardTitle>
                                <hr/>
                                <div className="messages">
                                    {
                                        this.state.messages.map((message, index) => {
                                            return(
                                                <div key={index}>
                                                    {message.author}: {message.message}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </CardBody>
                            <CardFooter>
                                <InputGroup>
                                    <Input placeholder="What's your name?" onChange={(e) => this.grabInput("name",e)}/>
                                </InputGroup>
                                <br/>
                                <InputGroup>
                                    <Input placeholder="What's your message?" onChange={(e) => this.grabInput("message",e)}/>
                                    <InputGroupAddon addonType="append">
                                        <Button color="primary" onClick={this.sendMessage}>Send</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Chat;
