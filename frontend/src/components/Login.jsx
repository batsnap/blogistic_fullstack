import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
const axios = require('axios')
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            token:'',
            refresh:'',
            feedback: ''
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleSubmit(event) {
        axios.post('http://localhost:8000/api/token/',{
            username: this.state.email,
            password: this.state.password,
            
        }).then(function (res){
            localStorage.setItem('refresh', res.data.refresh);
            localStorage.setItem('token', res.data.access);
            localStorage.setItem('user', res.config.data);
            window.location.replace('/profile');
        }).catch(err =>{
            this.setState({feedback:"Вы ввели неверный логин или пароль"})
        });
        
        
    }
    render() {
        return (
            <Container style={{ marginTop: '150px' }}>
                <Form className="d-flex flex-column align-items-center">
                    <Form.Group controlId="formBasicEmail" style={{ width: '300px' }}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChange}/>           
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicPassword" style={{ width: '300px' }}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicCheckbox" className="flex-start" style={{ marginLeft: '-180px' }}>
                            <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <h3>{this.state.feedback}</h3>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit} className="btn-block" style={{ maxWidth: '300px' }}>
                        Submit
                    </Button>
                </Form>
            </Container>
            
        )
    }
}
