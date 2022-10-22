import React from "react";
import check_token from "../../utils.js/check_toke";
const axios = require('axios');
class AddWorker extends React.Component {
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
            experience:'',
            position:'',
		};
		this.onChange=this.onChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}


	componentDidMount() 
	{
		check_token();
	}
	handleSubmit(event)
	{
		axios.post('http://localhost:8000/api/RegistraionWorker/',
        {
        'username':this.state.username,
        'email':this.state.email,
        'Full_name':this.state.Full_name,
        'birthday':this.state.birthday,
        'series_number_passport':this.state.series_number_passport,
        'phone_number':this.state.phone_number,
        'position':this.state.position,
        'experience':this.state.experience,
        }
		)
		window.location.replace('/Profile')
	}
	onChange = (e) => {
		this.setState({[e.target.name]:e.target.value})
	}

	render() {

		return (
			<div className="row">
				<div className="col-sm-4"></div>
				<div className="col-sm-4 bg-ligth text-black ">
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
                        <tr>
							<td>Опыт работы</td>
							<td><input style={{width:'400px'}} type="text" name='experience' value={this.state.experience} onChange={this.onChange}/></td>
						</tr>
                        <tr>
							<td>Должность</td>
                            
							<td>
                                <select style={{width:'400px'}} type="text" name='position' value={this.state.position} onChange={this.onChange}>
                                    <option value=''></option>
                                    <option value='Грузчик'>Грузчик</option>
                                    <option value='Водитель'>Водитель</option>
                                </select>
                            </td>
						</tr>
						</tbody>
					</table>
					<center>
						<input type="button" style={{width:'200px'}} value="Нанять!" onClick={this.handleSubmit}/>
					</center>
				</div>
			</div>
		);

	}
};
export default AddWorker;