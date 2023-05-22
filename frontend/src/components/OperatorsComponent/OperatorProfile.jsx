import React from "react";
import { Link } from "react-router-dom";
const axios = require('axios');
class OperatorProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grouper: "",
			profile: {},
			Authorization: false
		};
	}


	componentDidMount() {
		axios.get("http://localhost:8000/api/Operators/" + this.props.id + '/',
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
			<>
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<center><h3>Данные профиля</h3></center>
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
						<div className="col-sm-6">
							<Link to="/AllOrders" className="btn btn-primary mb-1 p-4" style={{ width: '300px' }}>Все заказы</Link>
							<Link to="/ListOrderProcessing" className="btn btn-primary mb-1 p-4" style={{ width: '300px' }}>Заказы на обработку</Link>
							<Link to="/ListClients" className="btn btn-primary mb-1 p-4" style={{ width: '300px' }}>Список клиентов</Link>
							<Link to="/ListWorkers" className="btn btn-primary mb-1 p-4" style={{ width: '300px' }}>Список водителей</Link>
							<Link to="/ListCars" className="btn btn-primary mb-1 p-4" style={{ width: '300px' }}>Список машин</Link>
							<Link to="/OperatorMakeOrder" className="btn btn-primary mb-1 p-4" style={{ width: '300px' }}>Сделать заказ за пользователя</Link>
							<Link to="/AddWorker" className="btn btn-primary mb-1 p-4" style={{ width: '300px' }}>Нанять рабочего</Link>
						</div>
					</div>
				</div>
			</>
		);


	}
};
export default OperatorProfile;