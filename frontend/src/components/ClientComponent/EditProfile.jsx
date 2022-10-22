import React from "react";
import { Form,Button } from "react-bootstrap";
import jwtDecode from "jwt-decode";
const axios = require('axios')
class EditProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: {},
			user:'',
			username:'',
			email:'',
			Full_name:'',
			birthday:'',
			series_number_passport:'',
			phone_number:'',
			user_reserved:'',
			user_email_reserved:'',
			registration_successful:'',
			biirthday_check:'',
			
		};
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChangeBirthday=this.onChangeBirthday.bind(this);
		this.onChange=this.onChange.bind(this);
	}
	
    componentDidMount()
    {
        if (Math.round(new Date().getTime() / 1000.0) < jwtDecode(localStorage.token)['exp']) {
			axios.get("http://localhost:8000/api/Users/" + jwtDecode(localStorage.token).user_id + '/',
				{
					'method': 'get',
					'headers': {
						'Authorization': "Bearer " + localStorage.token
					}
				})
				.then(les => {
					axios.get("http://localhost:8000/api/" + les.data.groups + "/" + jwtDecode(localStorage.token).user_id + '/',
						{
							'method': 'get',
							'headers': {
								'Authorization': "Bearer " + localStorage.token
							}
						})
						.then(res => {
							this.setState(
							{
								username:res.data.username,
								email:res.data.email,
								Full_name:res.data.Full_name,
								birthday:res.data.birthday,
								series_number_passport:res.data.series_number_passport,
								phone_number:res.data.phone_number,
								user_reserved:res.data.user_reserved,
								user_email_reserved:res.data.user_email_reserved,
								user:res.data.user,
								grouper: les.data.groups
							});

						})
				})


		}
		else {

			axios.post('http://localhost:8000/api/token/refresh', { 'refresh': localStorage.refresh })
				.then(res => {
					localStorage.setItem('token', res.data.access);
				});
			console.log(10);
			window.location.replace('/EditProfile');
		}
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
		}

		
		//568036800
	}
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
			this.setState({user_email_reserved:'Имя занято'});
		})
		
	};
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit(event) {
		console.log(this.state.email)
		axios.post('http://localhost:8000/api/EditProfile/',
			{'user':this.state.user,
			'username':this.state.username,
			'email':this.state.email,
			'Full_name':this.state.Full_name,
			'birthday':this.state.birthday,
			'series_number_passport':this.state.series_number_passport,
			'phone_number':this.state.phone_number}
		)
		this.setState({registration_successful:'Регистрация успешна,через 5 секунд вы будете перенаправлены на страницу входа'})
		window.location.replace('/Profile');
	}
    render()
    {
        return(
            <div>
                <center>
                <Form className="d-flex flex-column align-items-center">
					
					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Имя пользователя</Form.Label>
						<Form.Control 
							type="text" 
							value={this.state.username} 
							onBlur={this.onChangeUsername} 
							onChange={this.onChange}
							name="username"/>
							
					</Form.Group>
					<h3>{this.state.user_reserved}</h3>   
					

					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Почта</Form.Label>
						<Form.Control 
							type="text" 
							value={this.state.email} 
							name="email" 
							onChange={this.onChange}
							onBlur={this.onChangeEmail}/>
							<h3>{this.state.user_email_reserved}</h3>   
					</Form.Group>
					
					<Form.Group style={{ width: '500px' }}>
						<Form.Label>ФИО</Form.Label>
						<Form.Control 
							type="text" 
							value={this.state.Full_name} 
							name="Full_name" 
							onChange={this.onChange}/>           
					</Form.Group>


					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Дата рождения (формат Год-месяц-день)</Form.Label>
						<Form.Control 
							type="text" 
							value={this.state.birthday} 
							name="birthday" 
							onBlur={this.onChangeBirthday}
							onChange={this.onChange}/>           
						<h3>{this.state.biirthday_check}</h3>
					</Form.Group>
					
					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Серия и номер паспорта</Form.Label>
						<Form.Control 
							type="text" 
							value={this.state.series_number_passport} 
							name="series_number_passport" 
							onChange={this.onChange}/>
					</Form.Group>

					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Номер телефона</Form.Label>
						<Form.Control 	
							type="text" 
							value={this.state.phone_number} 
							name="phone_number"
							onChange={this.onChange}/>
							
					</Form.Group>
					<h3>{this.state.password_confirmation_state}</h3>
					<br></br>

					<Button variant="primary" type="submit" onClick={this.handleSubmit} className="btn-block" style={{ maxWidth: '500px' }}>
						Submit
					</Button>
					<h3>{this.state.registration_successful}</h3>
				</Form>
                </center>
            </div>
        )
    }
}


export default EditProfile;