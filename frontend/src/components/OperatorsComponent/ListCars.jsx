import React from "react";
import check_token from "../../utils.js/check_toke";
const axios = require('axios');
class ListCars extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			car_list1: [],
			car_list2: [],
			id:'1',
		};
		this.delete_car=this.delete_car.bind(this)
	}

	componentDidMount() {
		check_token();
		setTimeout(()=>{
			fetch("http://localhost:8000/api/Cars/",
			{
				'method': 'get',
				'headers': {
					'Authorization': "Bearer " + localStorage.token
				}
			})
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						car_list1: result.sort((a, b) => a.id_car > b.id_car ? 1 : -1),
						car_list2: result.sort((a, b) => a.id_car > b.id_car ? 1 : -1)
					});
				})	
		},400)
		
	}
	delete_car(e)
	{
		let isBoss = window.confirm("Уверены что хотите уволить этого сотрудника?");
		if (isBoss)
		{
			axios.post('http://localhost:8000/api/DeleteCar/',
			{
				'id_car':e.target.value
			})
			.then(res=>
			{
				if (res.status===200)
				{
					alert('Сотрудник успешно уволен')
				}
				else
				{
					alert('Что-то пошло не так!')
				}
			
				
			})
		}
		else
		{
			console.log('Ему повезло')
		}
	}

	render() {
		return (
			
			<div className="row">
				<div className="col-sm-2"></div>
				<div className="col-sm-8 text-center bg-light text-black ">
					<a href="/AddCar">AddCar</a>
					<table className="table table-sm table-responsive small text-center  table-striped table-hover">
						<thead>
							<tr>
								<th><button className="btn btn-black" onClick={this.sorting_id}>        Id машины</button></th>
								<th><button className="btn btn-black" onClick={this.sorting_name}>      Имя водителя</button></th>
								<th><button className="btn btn-black" onClick={this.sorting_experience}>  Тип машины</button></th>
								<th><button className="btn btn-black" onClick={this.sorting_experience}>  Цена машины за 1км</button></th>
								<th><button className="btn btn-black" onClick={this.sorting_position}>      Номер машины</button></th>
								<th><button className="btn btn-black" onClick={this.sorting_phone_number}>      Статус машины</button></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{this.state.car_list1.map(car =>
								<tr>
									<td><a href={"ListCars/" + car.id_car} key={car.id_car} className="text-black">{car.id_car}</a></td>
									<td>{car.name_worker}</td>
									<td>{car.type_car}</td>
									<td>{car.price}</td>
									<td>{car.car_number}</td>
									<td>{car.status}</td>
									<td><button value={car.id_car} onClick={this.delete_car}>Удалить машину</button></td>

								</tr>
							)}
						</tbody>
					</table>
				</div>
				<div className="col-sm-2"></div>
			</div>
		);
	}
};
export default ListCars;