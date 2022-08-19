import React from "react";
import jwtDecode from "jwt-decode";
const axios = require('axios');
class Profile extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		grouper:"",
		profile: {},
		Authorization:false
	  };
	}
	

	componentDidMount()
	{
		
			
		if (Math.round(new Date().getTime()/1000.0)<jwtDecode(localStorage.token)['exp'])
		{
			axios.get("http://localhost:8000/api/Users/"+jwtDecode(localStorage.token).user_id+'/',
			{
			'method':'get',
			'headers':{
			'Authorization':"Bearer "+localStorage.token}
			})
			.then(les =>
			{
				axios.get("http://localhost:8000/api/"+les.data.groups+"/"+jwtDecode(localStorage.token).user_id+'/',
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
						Authorization:true,
						grouper:les.data.groups
					});
					
				})
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
			window.location.replace('/profile');
		}
			
	}

	render() {
		if(this.state.grouper==='Clients')
		{
			return (
				<div className="row">
				<div className="col-sm-1 bg-success text-light" >
					<a className="text-light" href="my_orders">Мои заказы</a>
				</div>
				<div className="col-sm-10 text-center bg-info text-light ">
				  	<center>
						<h3>{this.state.grouper}</h3>
				  	</center>
						<table className="table">
						<tr>
							<td>Full name</td>
							<td>{this.state.profile.Full_name}</td>
						</tr>
						<tr>
							<td>Email</td>
							<td>{this.state.profile.email}</td>
						</tr>
						<tr>
							<td>Birthday</td>
							<td>{this.state.profile.birthday}</td>
						</tr>
						<tr>
							<td>Card number</td>
							<td>{this.state.profile.Card_number}</td>
						</tr>
						</table>
				</div>
				<div className="col-sm-1 bg-success text-white">
				</div>
				</div>
			  );
		}
		if(this.state.grouper==='Workers')
		{
			return (
				<div className="col-sm-10 text-center bg-info text-light ">
				  <center>
					<h3>{this.state.grouper}</h3>
				  </center>
					<table className="table">
					  <tr>
						  <td>Full name</td>
						  <td>{this.state.profile.Full_name}</td>
					  </tr>
					  <tr>
						<td>username</td>
						<td>{this.state.profile.username}</td>
					  </tr>
					  <tr>
						<td>Email</td>
						<td>{this.state.profile.email}</td>
					  </tr>
					  <tr>
						<td>position</td>
						<td>{this.state.profile.position}</td>
					  </tr>
					  <tr>
						<td>phone_number</td>
						<td>{this.state.profile.phone_number}</td>
					  </tr>
					</table>
					</div>
			  );
		}
		if(this.state.grouper==='Operators')
		{
			return (
				<div className="col-sm-10 text-center bg-info text-light ">
					<center>
						<h3>{this.state.grouper}</h3>
					</center>
					<table className="table">
						<tr>
							<td>Full name</td>
							<td>{this.state.profile.Full_name}</td>
					  	</tr>
					  	<tr>
							<td>username</td>
							<td>{this.state.profile.username}</td>
					  	</tr>
					  	<tr>
							<td>Email</td>
							<td>{this.state.profile.email}</td>
					  	</tr>
					  	<tr>
							<td>position</td>
							<td>{this.state.profile.position}</td>
					  	</tr>
					  	<tr>
							<td>phone_number</td>
							<td>{this.state.profile.phone_number}</td>
					  	</tr>
					</table>
				</div>
			  );
		}

	  

	}
	};
export default Profile;