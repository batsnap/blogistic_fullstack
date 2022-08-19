import React from "react";
import jwtDecode from "jwt-decode";
const axios = require('axios');
class ClientOrder extends React.Component {
	constructor(props) {
	  super(props);
	  
	  this.state = {
		profile: [],
		user:'',
		Authorization:false
	  };
	  
	}
	

	componentDidMount()
	{
		console.log(Math.round(new Date().getTime()/1000.0));
		console.log(jwtDecode(localStorage.token)['exp']);
		if (Math.round(new Date().getTime()/1000.0)<jwtDecode(localStorage.token)['exp'])
		{
			console.log(11);
			axios.get("http://localhost:8000/api/Orders_client/"+jwtDecode(localStorage.token).user_id+'/',
			{
			
			'method':'get',
			'headers':{
			'Authorization':"Bearer "+localStorage.token}
			})
			.then(res =>
			{
				this.setState
				({
					profile: res.data,
					Authorization:true
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
			window.location.replace('/my_orders/');
		}
			
	}

	render() {

	  return (
		
		  <div className="col-sm-10 text-center bg-info text-light ">
			  <h3>Orders</h3>
			  {this.state.profile.map(order=>
						<table className="table">
							<tr><td>id_order</td><td>{order.id_order}</td></tr>
							<tr><td>id_client</td><td>{order.name_client}</td></tr>
							<tr><td>id_operator</td><td>{order.name_operator}</td></tr>
							<tr><td>id_worker</td><td>{order.name_worker}</td></tr>
							<tr><td>addressPV</td><td>{order.addressPV}</td></tr>
							<tr><td>addressPD</td><td>{order.addressPD}</td></tr>
							<tr><td>date</td><td>{order.date}</td></tr>
							<tr><td>time_in</td><td>{order.time_in}</td></tr>
							<tr><td>weight</td><td>{order.weight}</td></tr>
							<tr><td>type_thing</td><td>{order.type_thing}</td></tr>
							<tr><td>confirmation_order</td><td>{order.confirmation_order}</td></tr>
							<tr><td>price</td><td>{order.price}</td></tr>
							<tr><td>type_pay</td><td>{order.type_pay}</td></tr>
							<tr><td>status_order</td><td>{order.status_order}</td></tr>
							<br></br>							
						</table>    

						)
				}
			
			</div>
		);

	}
	};
export default ClientOrder;