import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
const axios = require('axios')
export default class Registration extends Component {
	// Формы лучше контролить через сторонние библиотеки, все уже придумано. Вот 2 примера
	// https://formik.org/
	// https://redux-form.com/8.3.0/ (если использовать redux)
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username:'',
			surname:'',
			name:'',
			password: '',
			password_confirmation:'',
			password_confirmation_state:'',
			birthday:'',
			Card_number:'',
			token:'',
			render: false,
			user_reserved:'',
			user_email_reserved:'',
			registration_successful:''

		};
		this.onChange = this.onChange.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChangePassword=this.onChangePassword.bind(this)
	}
	onChangePassword = (e) => {
		if(e.target.value===this.state.password)
		{
			this.setState({password_confirmation_state:'Пароли совпадают'})
		}
		else
		{
			this.setState({password_confirmation_state:'Пароли не совпадают'})
		}
	};
	
	onChangeUsername = (e) => {
		axios.post('http://localhost:8000/api/reg_check_username',
		{
			'username':e.target.value
		})
		.then(res=>
		{
			
			if (res.status===200)
			{
				this.setState(
				{ 
					[e.target.name]: e.target.value,
					user_reserved:'Имя свободно'
				});
			}
		})
		.catch(err=>
		{
			this.setState
			({ 
				user_reserved:'Имя занято'
			});
		})
		
	};
	onChangeEmail = (e) => {
		axios.post('http://localhost:8000/api/reg_check_email',
		{
			'email':e.target.value
		})
		.then(res=>
		{
			
			if (res.status===200)
			{
				this.setState(
				{ 
					[e.target.name]: e.target.value,
					user_email_reserved:'Имя свободно'
				});
			}
		})
		.catch(err=>
		{
			this.setState
			({ 
				user_email_reserved:'Имя занято'
			});
		})
		
	};
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit(event) {
		axios.post('http://localhost:8000/api/registration/',
			{'username':this.state.username,
			'email':this.state.email,
			'password':this.state.password,
			'birthday':this.state.birthday,
			'name':this.state.name,
			'surname':this.state.surname}
			
		)
		this.setState({registration_successful:'Регистрация успешна,через 5 секунд вы будете перенаправлены на страницу входа'})
		window.location.replace('/login');
	}
	render() {
		return (
			<Container style={{ marginTop: '50px' }}>
				<h3 className='text-center'>Registration</h3>
				<Form className="d-flex flex-column align-items-center">
					
					<Form.Group style={{ width: '300px' }}>
						<Form.Label>Username</Form.Label>
						<Form.Control type="username" placeholder="Enter username" name="username" onBlur={this.onChangeUsername}/><h3>{this.state.user_reserved}</h3>
					</Form.Group>

					<Form.Group style={{ width: '300px' }}>
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" placeholder="Enter email" name="email" onBlur={this.onChangeEmail}/><h3>{this.state.user_email_reserved}</h3>   
					</Form.Group>
					
					<Form.Group style={{ width: '300px' }}>
						<Form.Label>Name</Form.Label>
						<Form.Control type="Name" placeholder="Enter name" name="name" value={this.state.name} onChange={this.onChange}/>           
					</Form.Group>

					<Form.Group style={{ width: '300px' }}>
						<Form.Label>Surname</Form.Label>
						<Form.Control type="Surname" placeholder="Enter surname" name="surname" value={this.state.surname} onChange={this.onChange}/>           
					</Form.Group>

					<Form.Group style={{ width: '300px' }}>
						<Form.Label>Birthday</Form.Label>
						<Form.Control type="date" placeholder="Enter birthday" name="birthday" value={this.state.birthday} onChange={this.onChange}/>           
					</Form.Group>
					
					<Form.Group controlId="formBasicPassword" style={{ width: '300px' }}>
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
					</Form.Group>

					<Form.Group controlId="formBasicPasswordConfiramation" style={{ width: '300px' }}>
						<Form.Label>Password confirmation</Form.Label>
						<Form.Control type="password" placeholder="Password_confirmation" name="password_confirmation" onChange={this.onChangePassword}/>
					</Form.Group>
					<h3>{this.state.password_confirmation_state}</h3>
					<br></br>

					<Button variant="primary" type="submit" onClick={this.handleSubmit} className="btn-block" style={{ maxWidth: '300px' }}>
						Submit
					</Button>
					<h3>{this.state.registration_successful}</h3>
				</Form>
			</Container>
			
		)
	}
}
