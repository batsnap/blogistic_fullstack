import React from "react";
import check_token from "../../utils.js/check_toke";
const axios = require('axios');
class ListWorkers extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
		workers_list1: [],
		workers_list2: [],
	  };
	  this.FireWorker=this.FireWorker.bind(this)
	}
	componentDidMount() 
	{
		check_token();
		setTimeout(()=>
		{
			fetch("http://localhost:8000/api/Workers/",
			{
			'method':'get',
			'headers':{
			'Authorization':"Bearer "+localStorage.token}
			})
			.then(res =>res.json())
			.then(
				(result) => 
				{
					this.setState({
						workers_list1: result.sort((a, b) => a.id_worker > b.id_worker ? 1:-1),
						workers_list2: result.sort((a, b) => a.id_worker > b.id_worker ? 1:-1)
					});
				})
		},400)
	}
	FireWorker(e)
	{
		let isBoss = window.confirm("Уверены что хотите уволить этого сотрудника?");
		if (isBoss)
		{
			axios.post('http://localhost:8000/api/FireWorker/',
			{
				'id_user':e.target.value
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
		  <table className="table table-sm table-responsive small text-center  table-striped table-hover">
			<thead>
			  <tr>
				<th><button className="btn btn-black" onClick={this.sorting_id}>        id</button></th>
				<th><button className="btn btn-black" onClick={this.sorting_name}>      Full name</button></th>
				<th><button className="btn btn-black" onClick={this.sorting_experience}>  birthday</button></th>
				<th><button className="btn btn-black" onClick={this.sorting_experience}>  experience</button></th>
				<th><button className="btn btn-black" onClick={this.sorting_position}>      position</button></th>
				<th><button className="btn btn-black" onClick={this.sorting_phone_number}>      phone_number</button></th>
				<th><button className="btn btn-black" onClick={this.sorting_phone_number}>      series_number_passport</button></th>
			  </tr>
			</thead>
			<tbody>
			  {this.state.workers_list1.map(worker=>
				  <tr>
					<td><a href={"ListWorkers/"+worker.user} key={worker.id_worker} className="text-black">{worker.id_worker }</a></td>
					<td>{worker.Full_name}</td>
					<td>{worker.birthday}</td>
					<td>{worker.experience}</td>
					<td>{worker.position}</td>
					<td>{worker.phone_number}</td>
					<td>{worker.series_number_passport}</td>
					<td><button onClick={this.FireWorker} value={worker.user}>уволить</button></td>
				  </tr>
			  )}
			</tbody>
		  </table>
		  </div>
		  <div className="col-sm-4"></div>
		  </div>
		);
	  }
	};
export default ListWorkers;