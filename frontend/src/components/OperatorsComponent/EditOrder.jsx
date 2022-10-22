import React from "react";
import check_token from "../../utils.js/check_toke";
const axios = require('axios');
class EditOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			order: [],
			worker_car: [],
			id_order:0,
			id_worker: 0,
			id_client: '',
			id_operator: '',
			addressPV: '',
			addressPD: '',
			date: '',
			time_in: '',
			weight: '',
			type_thing: '',
			count_objects:'',
			confirmation_order: '',
			price: '',
			type_pay: '',
			status_order: '',
		};
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		console.log(e.target.value)
	};
	handleSubmit(event) {
		console.log(this.state.id_worker)
		axios.post("http://localhost:8000/api/EditOrder",
		{
			"id_order":this.state.id_order,
			"id_worker":this.state.id_worker,
			"addressPV":this.state.addressPV,
			"addressPD":this.state.addressPD,
			"date":this.state.date,
			"time_in":this.state.time_in,
			"count_objects":this.state.count_objects,
			"weight":this.state.weight,
			"type_thing":this.state.type_thing,
			"price":this.state.price,
			"confirmation_order":this.state.confirmation_order,
			"type_pay":this.state.type_pay,
			"status_order":this.state.status_order
		}
		)
	
	}
	componentDidMount() {
		check_token()
		setTimeout(()=>
		{
			axios.get("http://localhost:8000/api/Orders/" + window.location.pathname.split('/')[2] + '/',
			{

				'method': 'get',
				'headers': {
					'Authorization': "Bearer " + localStorage.token
				}
			})
			.then(res => {
				this.setState(
				{
					id_order:res.data.id_order,
					id_worker:res.data.id_worker,
					id_client:res.data.id_client,
					id_operator: res.data.id_operator,
					addressPV: res.data.addressPV,
					addressPD: res.data.addressPD,
					date: res.data.date,
					time_in: res.data.time_in,
					weight:res.data.weight,
					type_thing: res.data.type_thing,
					confirmation_order: res.data.confirmation_order,
					price: res.data.price,
					count_objects:res.data.count_objects,
					type_pay: res.data.type_pay,
					status_order: res.data.status_order,
					name_worker:res.data.name_worker,
					name_client:res.data.name_client,
					name_operator:res.data.name_operator,
				});
			})
			axios.get("http://localhost:8000/api/Free_Workers",
			{

				'method': 'get',
				'headers': {
					'Authorization': "Bearer " + localStorage.token
				}
			})
			.then(res => {
				this.setState({worker_car: res.data,});
			})
		},400)

	}
	option_status_order()
	{
										
		if(this.state.confirmation_order==='Подтвержденно')
		{
			return(
			<>
			<option value={this.state.confirmation_order}>{this.state.confirmation_order}</option>
			<option value="Не подтвержденно">Не подтвержденно</option>
			<option value="Отказано">Отказано</option>
			</>)
		}
		else
		{
			return (
			<>
				<option value={this.state.confirmation_order}>{this.state.confirmation_order}</option>
				<option value="Подтвержденно">Подтвержденно</option>
				<option value="Отказано">Отказано</option>
			</>
			)
		}
	}
	render() {
		return (
			<div className="row">
				<div className="col-sm-4"></div>
				<div className="col-sm-4">
					<table className="table">
						<tr>
							<td>
								Номер заказа
							</td>
							<td>
								<h5>{this.state.id_order}</h5>
							</td>
						</tr>
						<tr>
							<td>
								Имя клиента
							</td>
							<td>
								<h5>{this.state.name_client}</h5>
							</td>
						</tr>
						<tr>
							<td>
								Имя оператора
							</td>
							<td>
								<h5>{this.state.name_operator}</h5>
							</td>
						</tr>
						<tr>
							<td>
								Имя рабочего
							</td>
							<td>
								<select name='id_worker'onChange={this.onChange}>
									<option value={this.state.id_worker}>{this.state.name_worker}</option>
									{this.state.worker_car.map(worker =>
										<option onChange={this.onChange} name='id_worker' value={worker.id_worker}>{worker.name_worker + " " + worker.type_car}</option>
									)}
								</select>

							</td>
						</tr>
						<tr>
							<td>
								Начальный адресс
							</td>
							<td>
								<input
									name='addressPV'
									value={this.state.addressPV}
									type="text"
									onChange={this.onChange} />
							</td>
						</tr>
						<tr>
							<td>
								Конечный адресс
							</td>
							<td>
								<input
									name='addressPD'
									value={this.state.addressPD}
									type="text"
									onChange={this.onChange} />
							</td>
						</tr>
						<tr>
							<td>
								Дата заказа
							</td>
							<td>
								<input
									name='date'
									value={this.state.date}
									type="text"
									onChange={this.onChange} />
							</td>
						</tr>
						<tr>
							<td>
								Время заказа
							</td>
							<td>
								<input
									name='time_in'
									value={this.state.time_in}
									type="text"
									onChange={this.onChange} />
							</td>
						</tr>
						<tr>
							<td>
								Вес заказа
							</td>
							<td>
								<input
									name='weight'
									value={this.state.weight}
									type="text"
									onChange={this.onChange} />
							</td>
						</tr>
						<tr>
							<td>
								Количество объектов
							</td>
							<td>
								<input
									name='count_objects'
									value={this.state.count_objects}
									type="text"
									onChange={this.onChange} />
							</td>
						</tr>
						<tr>
							<td>
								Тип вещей
							</td>
							<td>
								<input
									name='type_thing'
									value={this.state.type_thing}
									type="text"
									onChange={this.onChange} />
							</td>
						</tr>
						<tr>
							<td>
								Подтверждение заказа
							</td>
							<td>
								<select name='confirmation_order' value={this.state.confirmation_order} onChange={this.onChange}>
									{this.option_status_order()}
									
								</select>
							</td>
						</tr>
						<tr>
							<td>
								Цена
							</td>
							<td>
								<input
									name='price'
									value={this.state.price}
									type="text"
									onChange={this.onChange} />
							</td>
						</tr>
						<tr>
							<td>
								Тип оплаты
							</td>
							<td>
								<input
									name='type_pay'
									value={this.state.type_pay}
									type="text"
									onChange={this.onChange} />
							</td>
						</tr>
						<tr>
							<td>
								Статус заказа
							</td>
							<td>
								<input
									name='status_order'
									value={this.state.status_order}
									type="text"
									onChange={this.onChange} />
							</td>
						</tr>
					</table>
					<center>
						<input type="button" value={'Сохранить'} onClick={this.handleSubmit} />
					</center>
				</div>

			</div>

		);
	}
};
export default EditOrder;