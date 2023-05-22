import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
const axios = require('axios')
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			token: '',
			refresh: '',
			feedback: ''
		};
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit(event) {
		event.preventDefault();
		axios.post('http://localhost:8000/api/token/', 
		{
			'username': this.state.username,
			'password': this.state.password,

		}).then(function (res) {
			console.log(res.data)
			localStorage.setItem('refresh', res.data.refresh);
			localStorage.setItem('token', res.data.access);
			window.location.replace('/profile')
		}).catch(err => {
			this.setState({ feedback: "Вы ввели неверный логин или пароль" })
		});


	}
	render() {
		return (
			<section className="u-clearfix u-section-1" id="sec-5390">
				<div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
					<div className="u-form u-form-1">
							<Form className="d-flex flex-column align-items-center">
								<Form.Group controlId="formBasicUsername" style={{ width: '300px' }}>
									<Form.Label>Username</Form.Label>
									<Form.Control type="username" placeholder="Enter username" name="username" value={this.state.username} onChange={this.onChange} />
								</Form.Group>

								<Form.Group controlId="formBasicPassword" style={{ width: '300px' }}>
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
								</Form.Group>
								<h3>{this.state.feedback}</h3>
								<Button type="submit" onClick={this.handleSubmit} className="btn-block" style={{ maxWidth: '300px' }}>
									Submit
								</Button>
							</Form>
					</div>
				</div>
			</section>

		)
	}
}
