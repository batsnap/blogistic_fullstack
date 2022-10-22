import React from "react";
import { Link } from 'react-router-dom';
const axios = require('axios');
class WorkerProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grouper: "",
			profile: {},
		};
	}


	componentDidMount() {
		axios.get("http://localhost:8000/api/Workers/" + this.props.id + '/',
			{
				'method': 'get',
				'headers': {
					'Authorization': "Bearer " + localStorage.token
				}
			})
			.then(res => {
				this.setState({ profile: res.data, });

			})

	}

	render() {
		return (


			<div className="row">
				<div className="col-sm-1 "></div>
				<div className="col-sm-6">
					<table className="table bg-warning">
						<colgroup>
							<col width="47%"></col>
							<col width="53%"></col>
						</colgroup>
						<tbody className="u-table-body">
							<tr style={{ height: '69px' }}>
								<td className="u-table-cell">Имя пользователя:</td>
								<td className="u-table-cell">{this.state.profile.username}</td>
							</tr>
							<tr style={{ height: '69px' }}>
								<td className="u-table-cell">Электронная почта:</td>
								<td className="u-table-cell">{this.state.profile.email}</td>
							</tr>
							<tr style={{ height: '69px' }}>
								<td className="u-table-cell">Полное имя:</td>
								<td className="u-table-cell">{this.state.profile.Full_name}</td>
							</tr>
							<tr style={{ height: '69px' }}>
								<td className="u-table-cell">Номер телефона:</td>
								<td className="u-table-cell">{this.state.profile.phone_number}</td>
							</tr>
							<tr style={{ height: '69px' }}>
								<td className="u-table-cell">Серия и номер паспорта:</td>
								<td className="u-table-cell">{this.state.profile.series_number_passport}</td>
							</tr>
							<tr style={{ height: '69px' }}>
								<td className="u-table-cell">Дата рождения:<br></br>
								</td>
								<td className="u-table-cell">{this.state.profile.birthday}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="col-sm-2">
					<Link to='/WorkerOrders' className="btn btn-primary mb-1 p-4" style={{width:'300px'}}>Все мои заказы</Link>
					<Link to="/TodayOrders"	 className="btn btn-primary mb-1 p-4" style={{width:'300px'}}>Заказы на сегодня</Link>
					

				</div>
			</div>



		);


	}
};
export default WorkerProfile;