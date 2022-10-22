import React from "react";
import { Link } from 'react-router-dom';
const axios = require('axios');
class ClientsProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: {},
		};
	}


	componentDidMount() {
		axios.get("http://localhost:8000/api/Clients/" + this.props.id + '/',
			{
				'method': 'get',
				'headers': {
					'Authorization': "Bearer " + localStorage.token
				}
			})
			.then(res => {
				this.setState(
					{
						profile: res.data,
					});

			})

	}

	render() {
		return (
			<section className="u-clearfix u-section-1" id="sec-9a73">
				<div className="u-clearfix u-sheet u-sheet-1">
					<div className="u-container-style u-group u-opacity u-opacity-85 u-palette-3-base u-radius-48 u-shape-round u-group-1">
						<div className="u-container-layout u-container-layout-1">
							<div className="u-table u-table-responsive u-table-1">
								<center><h3>Данные профиля</h3></center>
								<table className="u-table-entity">
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
						</div>
					</div>
					<Link to="/EditProfile" className="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-1">Редактировать данные профиля</Link>
					<Link to="/MakeOrder" className="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-2">Сделать заказ</Link>
					<Link to="/ChangePassword" className="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-3">Изменть пароль</Link>
					<Link to="/MyOrders" className="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-4">Мои заказы</Link>
				</div>
			</section>
		);
	}
};
export default ClientsProfile;


