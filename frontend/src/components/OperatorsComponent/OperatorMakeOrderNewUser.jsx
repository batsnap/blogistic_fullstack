import React from "react";
import { Form,Button } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import check_token from "../../utils.js/check_toke";
const axios = require('axios')

class OperatorMakeOrderNewUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username:'',
			surname:'',
			name:'',
			series_number_passport:'',
			phone_number:'',
			user_reserved:'',
			user_email_reserved:'',
			biirthday_check:'',

			type_car:'',
			addressPV:'',
			addressPD:'',
			date:'',
			time_in:'',
			count_objects:'',
			weight:'',
			type_thing:'',
			price:'',
			view_price:'',
			time_in_check:'',
			count_objects_check:'',
			date_check:'',
			weight_check:'',
			registration_successful:'',
			

		};
		this.onChange=this.onChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		
		this.onBlurCountObjectCheck=this.onBlurCountObjectCheck.bind(this);
		this.onBlurTimeCheck=this.onBlurTimeCheck.bind(this);
		this.onBlurDateCheck=this.onBlurDateCheck.bind(this);
		this.onBlurWeightCheck=this.onBlurWeightCheck.bind(this);
		this.get_car_type=this.get_car_type.bind(this);

		this.onChangeBirthday=this.onChangeBirthday.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.handleSubmit1 = this.handleSubmit1.bind(this);
		
	}
	

	onBlurCountObjectCheck(e)
	{
		const paragraph = e.target.value;
		const regex = /^\d+$/;
		const found = paragraph.match(regex);
		if (found===null)
		{
			this.setState({count_objects_check:'Колличество введенно не верно'})
		}
		else
		{
			this.setState({count_objects_check:''})
		}
	}
	onBlurWeightCheck(e)
	{
		const paragraph = e.target.value;
		const regex = /^([0-9]*[.,]?[0-9]+$)/
		const found = paragraph.match(regex);
		if (found===null)
		{
			this.setState({weight_check:'Масса введенна не верно'})
		}
		else	
		{
			this.setState({weight_check:''})
			axios.post('')
		}
	}
	onBlurTimeCheck(e)
	{
		const paragraph = e.target.value;
		const regex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
		const found = paragraph.match(regex);
		if (found===null)
		{
			this.setState({time_in_check:'Время введенно не верно'})
		}
		else
		{
			this.setState({time_in_check:''})
		}
	}
	onBlurDateCheck(e)
	{
		const paragraph = e.target.value;
		const regex = /^([0-9]{4}[-/]?((0[13-9]|1[012])[-/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-/]?02[-/]?29)$/

		const found = paragraph.match(regex);
		if (found===null)
		{
			
			this.setState({date_check:'Дата введена не верно'})
		}
		else
		{
			if ((Math.round((new Date().getTime()/1000)))<=Math.round(new Date(e.target.value).getTime()/1000))
			{
				this.setState({date_check:''})
			}
			else
			{
				this.setState({date_check:'Введена прошлая дата'})
			}
		}
	}
	componentDidMount(){
		check_token()
		setTimeout(()=>
		{
			axios.get('http://localhost:8000/api/count_free_cars')
			.then(res=>
			{
				this.setState({car_list:res.data})
			})
		},400)
	}
	onChange(e)
	{
		this.setState({[e.target.name]:e.target.value})
	}
	get_car_type(e)
	{
		this.setState({[e.target.name]:e.target.value});
		axios.post('http://localhost:8000/api/GetTypeCar/',
		{
			'weight':this.state.weight,
			'type_thing':e.target.value,

		}
		).then(res=>
			{
				this.setState({
					type_car:res.data.type_car,
					price:res.data.price
				})
			})
			axios.post('http://localhost:8000/api/path_length',
			{
			'addressOUT':this.state.addressPV,
			'addressIN':this.state.addressPD
			}).then(les=>
			{
				if (les.data.length<300)
				{
					
					this.setState({view_price:'Стоимость перевозки составит-'+les.data.length*this.state.price*1.5,price:les.data.length*this.state.price*1.5})
				}
			})
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
		
	}
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
			this.setState({ user_email_reserved:'Имя занято'});
		})
		
	};
	handleSubmit1(event) {
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
		.then(res=>
			{
				console.log(res)
				if (res.status===200)
				{
					this.setState({registration_successful:'Регистрация успешна, продолжайте создание заказа',id_user:res.data.id_user})
				}
				else
				{
					this.setState({registration_successful:'Регистрация не прошла,повторите попытку'})
				}
			})
		
	}
	handleSubmit(event)
	{
		axios.post('http://localhost:8000/api/MakeOrder',
		{
			'id_user':this.state.id_user,
			'id_user_operator':jwtDecode(localStorage.token).user_id,
			'addressPV':this.state.addressPV,
			'addressPD':this.state.addressPD,	
			'date':this.state.date,
			'time_in':this.state.time_in,
			'count_objects':this.state.count_objects,
			'weight':this.state.weight,
			'type_thing':this.state.type_thing,
			'price':this.state.price,
			'type_car':this.state.type_car
		});
	}
	render(){
		 
		return(
			<div>
				<center>
				<Form className="d-flex flex-column align-items-center">
				<Form.Group style={{ width: '500px' }}>
						<Form.Label>Имя пользователя</Form.Label>
						<Form.Control type="username" placeholder="Enter username" name="username" onBlur={this.onChangeUsername}/><h3>{this.state.user_reserved}</h3>
					</Form.Group>

					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Пароль</Form.Label>
						<Form.Control type="email" placeholder="Enter email" name="email" onBlur={this.onChangeEmail}/><h3>{this.state.user_email_reserved}</h3>   
					</Form.Group>
					
					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Имя</Form.Label>
						<Form.Control type="Name" placeholder="Enter name" name="name" value={this.state.name} onChange={this.onChange}/>           
					</Form.Group>

					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Фамилия</Form.Label>
						<Form.Control type="Surname" placeholder="Enter surname" name="surname" value={this.state.surname} onChange={this.onChange}/>           
					</Form.Group>

					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Дата рождения</Form.Label>
						<Form.Control type="date" placeholder="Enter birthday" name="birthday" onBlur={this.onChangeBirthday}/>           
						<h3>{this.state.biirthday_check}</h3>
					</Form.Group>
					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Серия и номер паспорта</Form.Label>
						<Form.Control type="numbers" placeholder="Enter series number passport" name="series_number_passport" value={this.state.series_number_passport} onChange={this.onChange}/>           
						
					</Form.Group>
					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Номер телефона</Form.Label>
						<Form.Control type="numbers" placeholder="Enter phone number" name="phone_number" value={this.state.phone_number} onChange={this.onChange}/>           
						
					</Form.Group>
					
					<br />
					<input type="button" onClick={this.handleSubmit1} className="btn-block" style={{ maxWidth: '500px' }} value='Создать пользователя' />
					<br />
					{this.state.registration_successful}

					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Адрес отправления груза<br/>(Город улица дом №)</Form.Label>
						<Form.Control 
							type="text" 
							name="addressPV"
							onChange={this.onChange}/>
					</Form.Group>
					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Адрес Прбытия груза груза<br/>(Город улица дом №)</Form.Label>
						<Form.Control 
							type="text" 
							name="addressPD"
							onChange={this.onChange}/>
					</Form.Group>
					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Желаемая дата отправления груза<br/>(Год-Месяц-День)</Form.Label>
						<Form.Control 
							type="date" 
							name="date"
							onBlur={this.onBlurDateCheck}
							onChange={this.onChange}/>
					</Form.Group>
					<h3>{this.state.date_check}</h3>
					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Желаемое время отправления груза</Form.Label>
						<Form.Control 
							type="time" 
							name="time_in"
							onBlur={this.onBlurTimeCheck}
							onChange={this.onChange}/>
					</Form.Group>
					<h3>{this.state.time_in_check}</h3>
					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Примерное колличетсво объектов</Form.Label>
						<Form.Control 
							type="text" 
							name="count_objects"
							onChange={this.onChange}
							onBlur={this.onBlurCountObjectCheck}/>
					</Form.Group>
					<h3>{this.state.count_objects_check}</h3>

					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Примерный вес объектов в кг</Form.Label>
						<Form.Control 
							type="text" 
							name="weight"
							onChange={this.onChange}
							onBlur={this.onBlurWeightCheck}/>
					</Form.Group>
					<h3>{this.state.weight_check}</h3>
					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Предметный класс перевозимного груза</Form.Label>
						<Form.Select style={{ width: '500px' }}
							name="type_thing" 
							type="text" 
							onChange={this.get_car_type}>
								<option></option>
								<option value='furniture'>Мебель</option>
								<option value='building_materials'>Стройматериалы</option>
								<option value='office_furniture'>Офисная мебель</option>
								<option value='Bulky_building_materials'>Крупногабаритные стройматериалы(Длинные доски, кирпичи, блоки, металл)</option>
								<option value='food'>Продукты питания(не скоро протящиеся)</option>
								<option value='perishable_food'>Продукты питания(скоро протящиеся)</option>
								<option value='household_goods'>Хозтовары</option>
						</Form.Select>
						</Form.Group>
					<h3>{this.state.view_price}</h3>
					<br/>
					<br/>
					<h3>
					</h3>
					<Button variant="primary" type="submit" onClick={this.handleSubmit} className="btn-block" style={{ maxWidth: '500px' }}>
						Submit
					</Button>
				</Form>
				</center>
			</div>
		)
	}
}


export default OperatorMakeOrderNewUser;
