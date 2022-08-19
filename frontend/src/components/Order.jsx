import React from "react";
import jwtDecode from "jwt-decode";
const axios = require('axios');
class Order extends React.Component {
	constructor(props) {
	  super(props);
	  
	  this.state = {
		profile: {},
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
			axios.get("http://localhost:8000/api/Orders/"+window.location.pathname.split('/')[2]+'/',
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
			window.location.replace('/order/'+window.location.pathname.split('/')[2]);
		}
			
	}

	render() {

	  return (
		  <div className="col-sm-10 text-center bg-info text-light ">
			<center>
			  <h3>Order</h3>
			</center>
			  <table className="table">
				<tr>
					<td>id_order</td>
					<td>{this.state.profile.id_order}</td>
				</tr>
				<tr>
				  <td>id_client</td>
				  <td>{this.state.profile.name_client}</td>
				</tr>
				<tr>
				  <td>id_operator</td>
				  <td>{this.state.profile.name_operator}</td>
				</tr>
				<tr>
				  <td>id_worker</td>
				  <td>{this.state.profile.name_worker}</td>
				</tr>
                <tr>
				  <td>addressPV</td>
				  <td>{this.state.profile.addressPV}</td>
				</tr>
                <tr>
				  <td>addressPD</td>
				  <td>{this.state.profile.addressPD}</td>
				</tr>
                <tr>
				  <td>date</td>
				  <td>{this.state.profile.date}</td>
				</tr>
                <tr>
				  <td>time_in</td>
				  <td>{this.state.profile.time_in}</td>
				</tr>
                <tr>
				  <td>weight</td>
				  <td>{this.state.profile.weight}</td>
				</tr>
                <tr>
				  <td>type_thing</td>
				  <td>{this.state.profile.type_thing}</td>
				</tr>
                <tr>
				  <td>confirmation_order</td>
				  <td>{this.state.profile.confirmation_order}</td>
				</tr>
                <tr>
				  <td>price</td>
				  <td>{this.state.profile.price}</td>
				</tr>
                <tr>
				  <td>type_pay</td>
				  <td>{this.state.profile.type_pay}</td>
				</tr>
                <tr>
				  <td>status_order</td>
				  <td>{this.state.profile.status_order}</td>
				</tr>

			  </table>
		    </div>
		);

	}
	};
export default Order;