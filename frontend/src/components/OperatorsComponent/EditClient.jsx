import React from "react";
import check_token from "../../utils.js/check_toke";
const axios = require('axios');
class EditClient extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			profile: {},
			id_client:'',
			user: '',
			username:'',
			email:'',
			Full_name:'',
			birthday:'',
			series_number_passport:'',
			phone_number:'',
		};
		this.onChange=this.onChange.bind(this);
		this.reset_password=this.reset_password.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}


	componentDidMount() 
	{
		check_token();
		setTimeout(()=>{
			axios.get("http://localhost:8000/api/Clients/" + window.location.pathname.split('/')[2] + '/',
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
						id_client:res.data.id_client,
						user:res.data.user,
						username:res.data.username,
						email:res.data.email,
						Full_name:res.data.Full_name,
						birthday:res.data.birthday,
						series_number_passport:res.data.series_number_passport,
						phone_number:res.data.phone_number,
					});
				})
		},400)	
	}
	handleSubmit(event)
	{
		axios.post('http://localhost:8000/api/EditProfile/',
			{'user':this.state.user,
			'username':this.state.username,
			'email':this.state.email,
			'Full_name':this.state.Full_name,
			'birthday':this.state.birthday,
			'series_number_passport':this.state.series_number_passport,
			'phone_number':this.state.phone_number}
		)
		window.location.replace('/ListClients')
	}
	onChange = (e) => {
		this.setState({[e.target.name]:e.target.value})
	}
	reset_password()
	{
		axios.post('http://localhost:8000/api/NewPassword/',
			{'id_user':this.state.user}
		)
	}

	render() {

		return (
			<div className="row">
				<div className="col-sm-4"></div>
				<div className="col-sm-4 bg-ligth text-black ">
					<center>
						<h3>Клиент номер-{this.state.id_client}</h3>
					</center>
					<table className="table">
						<tbody>
						<tr>
							<td>Полное имя</td>
							<td><input style={{width:'400px'}} type="text" name='Full_name' value={this.state.Full_name} onChange={this.onChange}/></td>
						</tr>
						<tr>
							<td>Имя пользователя</td>
							<td><input style={{width:'400px'}} type="text" name='username' value={this.state.username} onChange={this.onChange}/></td>
						</tr>
						<tr>
							<td>Электронная почта</td>
							<td><input style={{width:'400px'}} type="text" name='email' value={this.state.email} onChange={this.onChange}/></td>
						</tr>
						<tr>
							<td>Дата рождения</td>
							<td><input style={{width:'400px'}} type="text" name='birthday' value={this.state.birthday} onChange={this.onChange}/></td>
						</tr>
						<tr>
							<td>Серия и номер паспорта</td>
							<td><input style={{width:'400px'}} type="text" name='series_number_passport' value={this.state.series_number_passport} onChange={this.onChange}/></td>
						</tr>
						<tr>
							<td>Номер телефона</td>
							<td><input style={{width:'400px'}} type="text" name='phone_number' value={this.state.phone_number} onChange={this.onChange}/></td>
						</tr>
						</tbody>
					</table>
					<center>
						<input type="button" style={{width:'200px'}} value="Сбросить пароль" onClick={this.reset_password}/><br/><br/>
						<input type="button" style={{width:'200px'}} value="Изменить данные" onClick={this.handleSubmit}/>
					</center>
				</div>
			</div>
		);

	}
};
export default EditClient;