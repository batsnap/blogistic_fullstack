import React from "react";
import jwtDecode from "jwt-decode";	
const axios = require('axios');
class OrderList extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
		post: [],
	  };
	  this.sorting_id=this.sorting_id.bind(this);
	  this.filter_cash=this.filter_cash.bind(this);
	}
	sorting_id(){
	  this.setState({post:this.state.post.sort((a, b) => a.id_operator > b.id_operator ? 1:-1)});
	}

	filter_cash(){
		this.setState({post:this.state.post.filter(el=>el.type_pay==='card')})
	}

	componentDidMount() 
	{
	if (Math.round(new Date().getTime()/1000.0)<jwtDecode(localStorage.token)['exp'])
	  	{
				
			fetch("http://localhost:8000/api/Orders/",
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
					post: result
					});
				})
		}
		else
		{
			axios.post('http://localhost:8000/api/token/refresh',{'refresh':localStorage.refresh})
			.then(res=>
			{
			localStorage.setItem('token',res.data.access);
			});
			console.log(10);
			window.location.replace('/orders');
		}
	}
	render() 
	{
		if (this.state.post.code==="token_not_valid")
	  	{
			return(
		  		<div className="col-sm-8 text-center">
				<h3>Yo are not log in</h3>
		  		</div>
			)
	  	}
	  	else
	  	{
			return (	
				
				<div className="col-sm-10  bg-info text-light  ">
					<button className="btn">cash</button>
					<button className="btn">card</button>
					<table className="table table-sm table-responsive small text-center  table-striped table-hover">
						<thead>
							<tr>
								<th><button className="btn btn-info" onClick={this.sorting_id}>        id_order</button></th>
								<th><button className="btn btn-info" onClick={this.sorting_name}>      name_client</button></th>
								<th><button className="btn btn-info" onClick={this.sorting_experience}>  name_operator</button></th>
								<th><button className="btn btn-info" onClick={this.sorting_position}>      name_worker</button></th>
								<th><button className="btn btn-info" onClick={this.sorting_phone_number}>      addressPV</button></th>
								<th><button className="btn btn-info" onClick={this.sorting_phone_number}>      addressPD</button></th>
								<th><button className="btn btn-info" onClick={this.sorting_phone_number}>      date</button></th>
								<th><button className="btn btn-info" onClick={this.sorting_phone_number}>      time_in</button></th>
								<th><button className="btn btn-info" onClick={this.sorting_phone_number}>      weight</button></th>
								<th><button className="btn btn-info" onClick={this.sorting_phone_number}>      type_thing</button></th>
								<th><button className="btn btn-info" onClick={this.sorting_phone_number}>      confirmation_order</button></th>
								<th><button className="btn btn-info" onClick={this.sorting_phone_number}>      price</button></th>
								<th><button className="btn btn-info" onClick={this.filter_cash}>      type_pay</button></th>
								<th><button className="btn btn-info" onClick={this.sorting_phone_number}>      status_order</button></th>

							</tr>
						</thead>
						<tbody>
							{this.state.post.map(posts=>
								<tr>
									<td><a href={"orders/"+posts.id_order} key={posts.id_order} className="text-light">{posts.id_order}</a></td>
									<td>{posts.name_client}</td>
									<td>{posts.name_operator}</td>
									<td>{posts.name_worker}</td>
									<td>{posts.addressPV}</td>
									<td>{posts.addressPD}</td>
									<td>{posts.date}</td>
									<td>{posts.time_in}</td>
									<td>{posts.weight}</td>
									<td>{posts.type_thing}</td>
									<td>{posts.confirmation_order}</td>
									<td>{posts.price}</td>
									<td>{posts.type_pay}</td>
									<td>{posts.status_order}</td>
								</tr>
							)}
						</tbody>
					</table>
					
				</div>	
			
			);
		}
	}
};
export default OrderList;