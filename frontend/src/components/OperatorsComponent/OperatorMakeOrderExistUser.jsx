import React from "react";
import { Form,Button } from "react-bootstrap";
import check_token from "../../utils.js/check_toke";
import jwtDecode from "jwt-decode";
const axios = require('axios')

class OperatorMakeOrderExistUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			find_word:'',
			type_find:'',

			id_user:'',

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
			confirmation_find_id:''
			


		};
		this.onChange=this.onChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		
		this.onBlurCountObjectCheck=this.onBlurCountObjectCheck.bind(this);
		this.onBlurTimeCheck=this.onBlurTimeCheck.bind(this);
		this.onBlurDateCheck=this.onBlurDateCheck.bind(this);
		this.onBlurWeightCheck=this.onBlurWeightCheck.bind(this);
		this.get_car_type=this.get_car_type.bind(this);

		this.GetUserId=this.GetUserId.bind(this);
	}
	
	GetUserId(e)
	{
		axios.post('http://localhost:8000/api/GetUserId/',
		{
			'type_find':this.state.type_find,
			'find_word':this.state.find_word


		}).then(res=>
			{
				if (res.status===200)
					this.setState({id_user:res.data.id_user,confirmation_find_id:'Пользователь найден,id-'+res.data.id_user})
				else
				{
					this.setState({confirmation_find_id:'Пользователь не найден, повторите попытку'})
				}
			})
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
					
					this.setState({view_price:'Стоимость перевозки составит-'+les.data.length*this.state.price*1.5+"рублей",price:les.data.length*this.state.price*1.5})
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
					<br />
					<h3>Поиск пользователя</h3>
					<select name="type_find" onChange={this.onChange}>
						<option value=""></option>
						<option value="phone_number">Номер телефона</option>
						<option value="username">Имя пользователя</option>
						<option value="email">Электронная почта</option>
					</select>
					<input type="text" value={this.find_word} name='find_word' onChange={this.onChange}/>
					<button onClick={this.GetUserId}>Найти пользователя</button>
					<h3>{this.state.confirmation_find_id}</h3>

				<Form className="d-flex flex-column align-items-center">
				

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
					<Button variant="primary" onClick={this.handleSubmit} className="btn-block" style={{ maxWidth: '500px' }}>
						Submit
					</Button>
				</Form>
				</center>
			</div>
		)
	}
}


export default OperatorMakeOrderExistUser;
