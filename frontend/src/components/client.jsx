import React from "react";
import jwtDecode from "jwt-decode";
const axios = require('axios');
class Client extends React.Component {
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
			axios.get("http://localhost:8000/api/Clients/"+String(Number(window.location.pathname.split('/')[2])+1)+'/',
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
			console.log(10);
			window.location.replace('/clients/'+window.location.pathname.split('/')[2]);
		}
			
	}

	render() {

	  return (
		  <div className="col-sm-8 text-center bg-info text-light ">
			<center>
			  <h3>Your profile</h3>
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
		);

	}
	};
export default Client;