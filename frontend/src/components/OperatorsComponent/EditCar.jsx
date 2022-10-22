import React from "react";
import check_token from "../../utils.js/check_toke";
const axios = require('axios');
class EditCar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id_car:'',
            name_worker:'',
            type_car:'',
            price:'',
            car_number:'',
            status:'',
            id_worker:'',
			list_free_workers:[],
		};
		this.onChange=this.onChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}


	componentDidMount() 
	{
		check_token();
		setTimeout(()=>{
			axios.get("http://localhost:8000/api/Cars/" + window.location.pathname.split('/')[2]+ '/',
				{

					'method': 'get',
					'headers': {
						'Authorization': "Bearer " + localStorage.token
					}
				})
				.then(res => 
				{
				this.setState(
					{
						id_car:res.data.id_car,
						name_worker:res.data.name_worker,
						type_car:res.data.type_car,
						price:res.data.price,
						car_number:res.data.car_number,
						status:res.data.status,
						id_worker:res.data.id_worker,
					});
				})
			axios.get('http://localhost:8000/api/ListFreeWorkers/')
			.then(res=>
			{
				this.setState({list_free_workers:res.data})	
			})
				
		},400)	
	}
	handleSubmit(event)
	{
		axios.post('http://localhost:8000/api/EditCar/',
		{
			'id_car':this.state.id_car,
			'id_worker':this.state.id_worker,
			'status':this.state.status,
			'price':this.state.price,
			'car_number':this.state.car_number,
		}
		)
		setTimeout(()=>{window.location.replace('/ListCars')},400)
		
	}
	onChange = (e) => {
		this.setState({[e.target.name]:e.target.value})
	}

	render() {

		return (
			<div className="row">
				<div className="col-sm-4"></div>
				<div className="col-sm-4 bg-ligth text-black ">
					<center>
						<h3>Машина номер-{this.state.id_car}</h3>
					</center>
					<table className="table">
						<tbody>
						<tr>
							<td>Имя, Номер рабочего</td>
							<td>
								<select style={{width:'400px'}} type="text" name='id_worker' value={this.state.id_worker} onChange={this.onChange}>
									<option value={this.state.id_worker}>{this.state.name_worker}-id-{this.state.id_worker}</option>
									<option value='null'>Без рабочего</option>
									{this.state.list_free_workers.map(worker=>
									<option value={worker.id_worker}>{worker.Full_name}-id-{worker.id_worker}</option>
									)}
								</select>
							</td>
						</tr>
						<tr>
							<td>Тип машины</td>
							<td>{this.state.type_car}</td>
						</tr>
						<tr>
							<td>Цена машины</td>
							<td><input style={{width:'400px'}} type="text" name='price' value={this.state.price} onChange={this.onChange}/></td>
						</tr>
						<tr>
							<td>Номер машины</td>
							<td><input style={{width:'400px'}} type="text" name='car_number' value={this.state.car_number} onChange={this.onChange}/></td>
						</tr>
						<tr>
							<td>Статус</td>
							<td><input style={{width:'400px'}} type="text" name='status' value={this.state.status} onChange={this.onChange}/></td>
						</tr>
						</tbody>
					</table>
					<center>
						<input type="button" style={{width:'200px'}} value="Изменить данные" onClick={this.handleSubmit}/>
					</center>
				</div>
			</div>
		);

	}
};
export default EditCar;