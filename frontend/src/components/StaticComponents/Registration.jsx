import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
const axios = require('axios')
export default class Registration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username:'',
			surname:'',
			name:'',
			series_number_passport:'',
			series_number_passport_confirmation:'',
			phone_number:'',
			phone_number_cofirmation:'',
			password: '',
			password_confirmation:'',
			password_confirmation_state:'',
			birthday:'',
			Card_number:'',
			token:'',
			render: false,
			user_reserved:'',
			user_email_reserved:'',
			registration_successful:'',
			biirthday_check:'',

		};
		this.onChange = this.onChange.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChangePassword=this.onChangePassword.bind(this);
		this.onChangeBirthday=this.onChangeBirthday.bind(this);
		this.onBlurPassport=this.onBlurPassport.bind(this);
		this.onBlurPhone_number=this.onBlurPhone_number.bind(this);
		
		
	}
	onChangeBirthday=(e)=>
	{
		if ((Math.round((new Date().getTime()/1000))-568036800)<Math.round(new Date(e.target.value).getTime()/1000))
		{
			this.setState({biirthday_check:'Вам недостаточно лет для регистрации'})
		}
		else
		{
			this.setState({biirthday_check:'Все отлично вы прошли проверку по возрасту',birthday:e.target.value})
			console.log(e.target.value)
		}

		
		//568036800
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
			this.setState({user_reserved:'Имя занято'});
		})
		
	};
	onChangeEmail = (e) => {
		const paragraph = e.target.value;
		const regex = /^([a-zA-Z1-9\-._]+@[a-z1-9]+(.[a-z1-9]+){1,})$/
		const found = paragraph.match(regex);
		if (found===null)
		{
			this.setState({user_email_reserved:'Почтовый адресс введен не верно'})
		}
		else
		{
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
						user_email_reserved:''
					});
				}
			})
			.catch(err=>
			{
				this.setState({ user_email_reserved:'Аккаунт с такой почтой уже зарегистрирован'});
			})
		}
		
		
	};
	onBlurPassport=(e)=>
	{
		const paragraph = e.target.value;
		const regex = /^(\d{4}\s\d{6})$/

		const found = paragraph.match(regex);
		if (found===null)
		{
			
			this.setState({series_number_passport_confirmation:'Данные паспорта введены не верно'})
		}
		else
		{
			this.setState({series_number_passport_confirmation:''})
		}
	}
	onBlurPhone_number=(e)=>
	{
		const paragraph = e.target.value;
		const regex = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/

		const found = paragraph.match(regex);
		if (found===null)
		{
			
			this.setState({phone_number_cofirmation:'Номер телоефона введен не верно'})
		}
		else
		{
			this.setState({phone_number_cofirmation:''})
		}
	}

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
			'surname':this.state.surname,
			'series_number_passport':this.state.series_number_passport,
			'phone_number':this.state.phone_number}			
		)
		this.setState({registration_successful:'Регистрация успешна,через 5 секунд вы будете перенаправлены на страницу входа'})
		window.location.replace('/login');
	}

	render() {
		return (
			<Container style={{ marginTop: '50px' }}>
				<title>Регистрация</title>
				<h3 className='text-center'>Registration</h3>
				<Form className="d-flex flex-column align-items-center">
					
					<Form.Group style={{ width: '300px' }}>
						<Form.Label>Имя пользователя</Form.Label>
						<Form.Control type="username" placeholder="Enter username" name="username" onBlur={this.onChangeUsername}/><h3>{this.state.user_reserved}</h3>
					</Form.Group>

					<Form.Group style={{ width: '300px' }}>
						<Form.Label>Почтовый адресс</Form.Label>
						<Form.Control type="email" placeholder="Enter email" name="email" onBlur={this.onChangeEmail}/><h3>{this.state.user_email_reserved}</h3>   
					</Form.Group>
					
					<Form.Group style={{ width: '300px' }}>
						<Form.Label>Имя</Form.Label>
						<Form.Control type="Name" placeholder="Enter name" name="name" value={this.state.name} onChange={this.onChange}/>           
					</Form.Group>

					<Form.Group style={{ width: '300px' }}>
						<Form.Label>Фамилия</Form.Label>
						<Form.Control type="Surname" placeholder="Enter surname" name="surname" value={this.state.surname} onChange={this.onChange}/>           
					</Form.Group>

					<Form.Group style={{ width: '300px' }}>
						<Form.Label>Дата рождения</Form.Label>
						<Form.Control type="date" placeholder="Enter birthday" name="birthday" onBlur={this.onChangeBirthday}/>           
						<h3>{this.state.biirthday_check}</h3>
					</Form.Group>
					<Form.Group style={{ width: '300px' }}>
						<Form.Label>Серия и номер паспорта</Form.Label>
						<Form.Control type="numbers" placeholder="Enter series number passport" name="series_number_passport" value={this.state.series_number_passport} onChange={this.onChange} onBlur={this.onBlurPassport}/> 
						<h3>{this.state.series_number_passport_confirmation}</h3>          
						
					</Form.Group>
					<Form.Group style={{ width: '300px' }}>
						<Form.Label>Номер телефона</Form.Label>
						<Form.Control type="numbers" placeholder="Enter phone number" name="phone_number" value={this.state.phone_number} onChange={this.onChange} onBlur={this.onBlurPhone_number}/>
						<h3>{this.state.phone_number_cofirmation}</h3>
					</Form.Group>
					
					<Form.Group controlId="formBasicPassword" style={{ width: '300px' }}>
						<Form.Label>Пароль</Form.Label>
						<Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
					</Form.Group>

					<Form.Group controlId="formBasicPasswordConfiramation" style={{ width: '300px' }}>
						<Form.Label>Подтвержение пароля</Form.Label>
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
